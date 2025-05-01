import Mongoose, { SchemaType } from "mongoose";

const historySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // One preference document per user
      },
      ingredientsFound: [{
        name: {
          type: String,
          required: true,
          trim: true
        },
        // isAllergen: {
        //   type: Boolean,
        //   default: false
        // },
        // healthImpact: {
        //   type: String,
        //   enum: ['low', 'medium', 'high'],
        //   default: 'medium'
        // },
        // description: String,
        // recommendation: String
      }],
      summary: {
        type : String,
        required: true,
      },
      productName: String,
  
        // Analysis scores
      healthScore: {
        type: Number,
        min: 0,
        max: 100
      },
      warningFlags: [String]
},
{
    timestampa : true,
    toJSON: { virtuals: true }
});

export const history = mongoose.model("History", historySchema);