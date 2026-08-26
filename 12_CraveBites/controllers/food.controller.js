import HttpError from "../middleware/HttpError.js";
import Food from "../models/food.model.js";
import cloudinary from "../config/cloudinary.js";
import restaurantModel from "../models/restaurant.model.js";

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

    res.status(200).json({
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

const updateFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);

    if (!food) {
      return next(new HttpError("Food not found", 404));
    }

    //provider -> only own restaurant.s foods

    if (req.user.role === "provider") {
      const restaurant = await Food.findOne({
        _id: order.food,
        owner: req.user._id,
      });
      if (!restaurant) {
        return next(new HttpError("access denied", 403));
      }
    }

    if(req.user.role !== "admin" && req.user.role !== "provider"){
      return next(new HttpError("Access denied",403));
    }

    const updates = Object.keys(req.body);
    
        const allowedFields = [
          "name",
          "description",
          "price",
          "category",
          "isAvailable",
          "foodType",
          "preparingTime",
         
        ];
    
        const isValid = updates.every((field) => allowedFields.includes(field));
    
        if (!isValid) {
          return next(new HttpError("only allowed field can be updated", 400));
        }
    
        updates.forEach((update) => {
          food[update] = req.body[update];
        });

        await food.save();

    res.status(200).json({
      success: true,
      message: "food data updated successfully!",
      food,
    });
    
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);

    if (!food) {
      return next(new HttpError("food not found", 404));
    }
    //customer -> only own food delete
    if (
      req.user.role === "customer" &&
      req.user._id.toString() !== food.customer.toString()
    ) {
      return next(new HttpError("Access denied", 403));
    }

    //provider -> only own food's delete

    if (req.user.role === "provider") {
      const restaurant = await restaurantModel.findOne({
        _id: food.restaurent,
        owner: req.user._id,
      });

      if (!restaurant) {
        return next(new HttpError("Access denied", 403));
      }
    }
    // customer -> cannot delete food
    if(req.user.role !== "admin" && req.user.role !== "provider"){
      return next(new HttpError("Access denied",403));
    }

    //Admin -> can delete any order

    await food.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "food deleted successfully!" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};


export default { add, getAllFood,updateFood,deleteFood};
