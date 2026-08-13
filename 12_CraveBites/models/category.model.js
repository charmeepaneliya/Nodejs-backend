
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary";

const foodCategorySchema = new mongoose.Schema({
  categoryType: {
    type: String,
    required: true,
    enum: [
      "Pizza",
      "Burger",
      "Biryani",
      "Chinese",
      "South Indian",
      "North Indian",
      "Gujarati",
      "Punjabi",
      "Sandwich",
      "Pasta",
      "Momos",
      "Salad",
      "Desserts",
      "Ice Cream",
      "Drinks",
      "Fast Food",
    ],
  },
  description:{
    type:String,

  },
  categoryImage:{
    type:String,

  },
  cloudinary_id:{
    type:String,
    required:true,
  },
  // owner:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"User",
  //   required:true,
  // },
  // isAvailable:{
  //   type:Boolean,
  //   default:true,
  // },
  // restaurant:{
  //   type:mongoose.Schema.Types.ObjectId,
  //   ref:"Restaurant"
  // }
},{
    timestamps:true,
});

const foodCategory = mongoose.model("foodCategory",foodCategorySchema);
