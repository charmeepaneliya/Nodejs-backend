import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";


const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foodCategory",
       
    },

    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "nonveg"],
      default: "veg",
    },
   
    foodImage: {
      type: [String],
      required: true,
    },
    cloudinary_id: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Food = mongoose.model("Food", foodSchema);

export default Food;
