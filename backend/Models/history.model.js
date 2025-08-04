import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const historySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  ingredientsFound: [{
    name: {
      type: String,
      required: true,
      trim: true
    }
  }],
  summary: {
    type: String,
    required: true
  },
  healthScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  warningFlags: [{
    type: String,
    trim: true
  }],
  scanDate: {
    type: Date,
    default: Date.now
  },
  analysisDetails: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true,
  toJSON: { virtuals: false },
  toObject: { virtuals: false }
});

// Add pagination plugin
historySchema.plugin(mongoosePaginate);

// Index for user's history queries
historySchema.index({ user: 1, scanDate: -1 });

export const History = mongoose.model('History', historySchema);