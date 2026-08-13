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
      foodImage: req.files.map((file) => file.path),
      cloudinary_id: req.files.map((file) => file.filename),
    });

    res.status(201).json({
      success: true,
      message: "Food added successfully!",
      newFood,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const getAllFood = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      restaurent,
      category,
      foodType,
      isAvailable,
      isVerified,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (restaurent) {
      filter.restaurent = restaurent;
    }

    if (category) {
      filter.category = category;
    }

    if (foodType) {
      filter.foodType = foodType;
    }

    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    if (isVerified !== undefined) {
      filter.isVerified = isVerified === "true";
    }

    const sortOption = {
      [sort]: order === "asc" ? 1 : -1,
    };

    const totalFood = await Food.countDocuments(filter);

    const foods = await Food.find(filter)
      .populate("category")
      .populate("restaurent")
      .populate("providerName", "name email")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    if (foods.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "food not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Food found successfully!",
        totalFood,
        page,
        limit,
        totalPages: Math.ceil(totalFood / limit),
        foods,
      });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add, getAllFood};
