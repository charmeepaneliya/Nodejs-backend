import HttpError from "../middleware/HttpError.js";
import Food from "../models/food.model.js";
import cloudinary from "../config/cloudinary.js";

const add = async (req, res, next) => {
  try {
    const { name, description, price, category, restaurent, foodType } =
      req.body;
    const newFood = await Food.create({
      name,
      description,
      price,
      category,
      restaurent,
      foodType,
      foodImage:req.files.map((file) => file.path),
      cloudinary_id:req.files.map((file) => file.filename),
    });

     res.status(201).json({
      success: true,
      message: "Food added successfully!",
      newFood,
    });
  } catch (error) {
    return next(new HttpError(error.message,500));
  }
};

export default {add};
