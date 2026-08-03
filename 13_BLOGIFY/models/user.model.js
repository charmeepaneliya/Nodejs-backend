
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          return "password can't contain password words as password";
        }
      },
    },
     role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address:{
      type:String,
      required:true,
    },
    profilePic:{
      type:String,
    },
    cloudinary_id:{
      type:String,
    },
},
{
    timestamps: true,
});

const User = mongoose.model("User",userSchema);

export default User;