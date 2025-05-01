import mongoose from 'mongoose'

const user = new Schema({
    userName :{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
    },
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
},
{
    timestamps: true,
});

export const userSchema = mongoose.model("User",user);