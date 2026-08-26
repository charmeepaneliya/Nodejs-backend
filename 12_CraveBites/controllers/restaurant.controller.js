import restaurantModel from "../models/restaurant.model.js";

import HttpError from "../middleware/HttpError.js";

import sendMail from "../utils/sendEmail.js";
import restaurantEmailTemplate from "../template/restaurentEmailTemplate.js";

const add = async (req, res, next) => {
  try {
    const {
      restaurantName,
      description,
      address,
      city,
      state,
      phone,
      openingTime,
      closingTime,
      isOpen,
    } = req.body;
    const newRestaurant = await restaurantModel.create({
      restaurantName,
      description,
      address,
      city,
      state,
      phone,
      openingTime,
      closingTime,
      isOpen,
      restaurantImage: req.file?.path || null,
      cloudinary_Id: req.file?.filename || null,
      owner: req.user._id,
    });

    await sendMail(
      req.user.email,
      "Restaurant added seccessfully! - CraveBites 🍔",
      restaurantEmailTemplate(req.user.name, restaurantName),
    );

    res.status(201).json({
      success: true,
      message: "restaurant added successfully!",
      newRestaurant,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllRestaurant = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      isOpen,
      search,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (search) {
      filter.restaurantName = {
        $regex: search,
        $options: "i",
      };
    }
    if (isOpen !== undefined) {
      filter.isOpen = isOpen === "true";
    }
    
    const sortoption = {
      [sort]: order === "asc" ? 1 : -1,
    };
    const totalRestaurant = await restaurantModel.countDocuments(filter);
    const restaurant = await restaurantModel
      .find(filter)
      .populate("owner", "name email address -_id")
      .sort(sortoption)
      .skip((page - 1) * limit)
      .lean();

    if (restaurant.length === 0) {
      res.status(404).json({ success: false, message: "restaurant note found" });
    }
    res.status(200).json({
      success: true,
      message: "restaurant founds",
      totalRestaurant: totalRestaurant,
      page: page,
      restaurant,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return next(new HttpError("Restaurant not found", 404));
    }

    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== restaurant.owner.toString()
    ) {
      return next(new HttpError("Access denied", 403));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "restaurantName",
      "description",
      "address",
      "city",
      "state",
      "phone",
      "openingTime",
      "closingTime",
      "isOpen",
    ];

    const isValid = updates.every((field) => allowedFields.includes(field));

    if (!isValid) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      restaurant[update] = req.body[update];
    });

    if (req.file) {
      restaurant.restaurantImage = req.file.path;
      restaurant.cloudinary_Id = req.file.filename;
    }
    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "restaurant data updated successfully!",
      restaurant,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return next(new HttpError("Restaurant not found", 404));
    }

    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== restaurant.owner.toString()
    ) {
      return next(new HttpError("Access denied", 403));
    }

    await restaurant.deleteOne();
    res.status(200).json({
      success: true,
      message: "restaurant deleted successfully!",
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add, getAllRestaurant, updateRestaurant, deleteRestaurant };
