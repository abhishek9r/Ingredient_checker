import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  preferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preference'
  },
  scanHistory: [{
    date: {
      type: Date,
      default: Date.now
    },
    productName: String,
    ingredients: [String],
    analysis: Object
  }]
}, {
  timestamps: true
});

export const User = mongoose.model('User', userSchema);