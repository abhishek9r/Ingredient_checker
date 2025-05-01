require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.post('/api/process-image', async (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const imagePart = {
      inlineData: {
        data: imageData.split(',')[1],
        mimeType: "image/jpeg"
      }
    };
    
    const prompt = "Extract all ingredients from this product label. Return only the list of ingredients in plain text format, one per line. Do not include any additional commentary or analysis.";
    
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    res.json({ text });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
});

app.post('/api/analyze-text', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Analyze these food ingredients for healthiness, potential allergens, and nutritional value:
    
    ${text}
    
    Return your analysis in the following JSON format:
    {
      "overallAssessment": "brief summary of the overall healthiness",
      "ingredients": [
        {
          "name": "ingredient name",
          "description": "short description",
          "healthImpact": "low/medium/high",
          "potentialAllergens": boolean,
          "commonUses": "common food uses"
        }
      ]
    }
    
    Be concise and factual in your analysis.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const responseText = response.text();
    
    // Try to parse the JSON response
    try {
      const jsonResponse = JSON.parse(responseText.replace(/```json|```/g, '').trim());
      res.json(jsonResponse);
    } catch (e) {
      res.json({ rawResponse: responseText });
    }
  } catch (error) {
    console.error("Error analyzing text:", error);
    res.status(500).json({ error: "Failed to analyze text" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});