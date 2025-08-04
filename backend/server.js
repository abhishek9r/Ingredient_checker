import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Preference } from './models/Preference.model.js';
import { User } from './models/user.model.js';
import { auth } from 'express-oauth2-jwt-bearer';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Auth0 middleware
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Auth0-protected routes
app.use('/api/user', jwtCheck);

// 👤 Create or fetch user
app.post('/api/user/create', async (req, res) => {
  console.log("📥 /api/user/create was called");
  try {
    if (!req.auth || !req.auth.payload) {
      return res.status(401).json({ error: "Unauthorized: Missing Auth0 payload" });
    }

    const auth0User = req.auth.payload;
    console.log("✅ Auth0 user payload:", req.auth?.payload);


    // Check if user exists
    const existingUser = await User.findOne({ email: auth0User.email });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // Create new user
    const newUser = new User({
      auth0Id: auth0User.sub,
      userName: auth0User.nickname || auth0User.email.split('@')[0],
      email: auth0User.email,
      phone: auth0User.phone_number || null,
      firstName: auth0User.given_name || '',
      lastName: auth0User.family_name || ''
    });

    await newUser.save();
    return res.status(201).json(newUser);

  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// 👤 Fetch user profile
app.get('/api/user/profile', async (req, res) => {
  try {
    const auth0User = req.auth.payload;
    const user = await User.findOne({ email: auth0User.email });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);

  } catch (error) {
    console.error("❌ Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// 🌱 Preferences: Save
app.post('/api/set-preferences', async (req, res) => {
  try {
    const { userId, restrictions } = req.body;
    if (!userId || !restrictions) return res.status(400).json({ error: 'Missing required fields' });

    const validRestrictions = [
      'glutenFree', 'peanutAllergy', 'dairyFree', 'shellfishAllergy',
      'soyAllergy', 'eggAllergy', 'treeNutAllergy', 'fishAllergy',
      'halal', 'kosher', 'vegan', 'vegetarian', 'lactoseIntolerant'
    ];

    for (const key in restrictions) {
      if (!validRestrictions.includes(key) || typeof restrictions[key] !== 'boolean') {
        return res.status(400).json({ error: `Invalid restriction: ${key}` });
      }
    }

    const preference = await Preference.findOneAndUpdate(
      { user: userId },
      { user: userId, restrictions },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, message: 'Preferences saved successfully', preferences: preference });

  } catch (error) {
    console.error("❌ Error saving preferences:", error);
    res.status(500).json({ error: "Failed to save preferences" });
  }
});

// 🌱 Preferences: Get
app.get('/api/get-preferences/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: 'User ID is required' });

    const preference = await Preference.findOne({ user: userId });

    if (!preference) {
      return res.json({
        exists: false,
        message: 'No preferences found for this user',
        preferences: { restrictions: Object.fromEntries(validRestrictions.map(key => [key, false])) }
      });
    }

    res.json({ exists: true, preferences: preference });

  } catch (error) {
    console.error("❌ Error fetching preferences:", error);
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
});

// 📸 Image processing
app.post('/api/process-image', async (req, res) => {
  try {
    const { imageData } = req.body;
    if (!imageData) return res.status(400).json({ error: 'No image data provided' });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imagePart = {
      inlineData: {
        data: imageData.split(',')[1],
        mimeType: "image/jpeg"
      }
    };

    const prompt = "Extract all ingredients from this product label. Return only the list of ingredients in plain text format, one per line.";

    const result = await model.generateContent([prompt, imagePart]);
    const text = (await result.response).text();

    res.json({ text });

  } catch (error) {
    console.error("❌ Error processing image:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
});

// 🧾 Text analysis
app.post('/api/analyze-text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'No text provided' });

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze these food ingredients for healthiness, potential allergens, and nutritional value:

    ${text}

    Return your analysis in JSON format:
    {
      "overallAssessment": "...",
      "ingredients": [
        {
          "name": "...",
          "description": "...",
          "healthImpact": "...",
          "potentialAllergens": true/false,
          "commonUses": "..."
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const responseText = (await result.response).text();

    try {
      const jsonResponse = JSON.parse(responseText.replace(/```json|```/g, '').trim());
      res.json(jsonResponse);
    } catch (err) {
      res.json({ rawResponse: responseText });
    }

  } catch (error) {
    console.error("❌ Error analyzing text:", error);
    res.status(500).json({ error: "Failed to analyze text" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
