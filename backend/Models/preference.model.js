import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  restrictions: {
    glutenFree: Boolean,
    peanutAllergy: Boolean,
    dairyFree: Boolean,
    shellfishAllergy: Boolean,
    soyAllergy: Boolean,
    eggAllergy: Boolean,
    treeNutAllergy: Boolean,
    fishAllergy: Boolean,
    halal: Boolean,
    kosher: Boolean,
    vegan: Boolean,
    vegetarian: Boolean,
    lactoseIntolerant: Boolean
  },
  dietaryGoals: [String],
  favoriteCuisines: [String]
}, {
  timestamps: true
});

export const Preference = mongoose.model('Preference', preferenceSchema);