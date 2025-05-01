import mongoose from "mongoose";

const preferenceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // One preference document per user
      },
      
      // Common dietary restrictions (boolean flags)
      restrictions: {
        glutenFree: { type: Boolean, default: false },
        peanutAllergy: { type: Boolean, default: false },
        dairyFree: { type: Boolean, default: false },
        shellfishAllergy: { type: Boolean, default: false },
        soyAllergy: { type: Boolean, default: false },
        eggAllergy: { type: Boolean, default: false },
        treeNutAllergy: { type: Boolean, default: false },
        fishAllergy: { type: Boolean, default: false },
        halal: { type: Boolean, default: false },
        kosher: { type: Boolean, default: false },
        vegan: { type: Boolean, default: false },
        vegetarian: { type: Boolean, default: false },
        lactoseIntolerant: { type: Boolean, default: false }
      },

        // Dietary preferences (not allergies)
        // for future imoplementation
//   preferences: {
//     preferredCuisines: [{
//       type: String,
//       enum: ['italian', 'mexican', 'indian', 'chinese', 'japanese', 'mediterranean', 'american', 'other']
//     }],
//     spicyFoodTolerance: {
//       type: String,
//       enum: ['none', 'mild', 'medium', 'high'],
//       default: 'medium'
//     },
//     organicPreference: {
//       type: String,
//       enum: ['none', 'some', 'strict'],
//       default: 'some'
//     }
//   },

},
{
    timestamp : true
});

export const preferences = mongoose.model("Preferences", preferenceSchema);