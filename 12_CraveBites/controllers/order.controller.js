import HttpError from "../middleware/HttpError.js";
import Food from "../models/food.model.js";
import Order from "../models/order.model.js";
import restaurantModel from "../models/restaurant.model.js";

const orderAdd = async (req, res, next) => {
  try {
    const { restaurant, items, status, address, phone } = req.body;
    let totalAmount = 0;

    const foodIds = items.map((item) => {
      return item.food.toString();
    });

    const foods = await Food.find({
      _id: { $in: foodIds },
    });

    if (foods.length !== items.length) {
      return next(new HttpError("One or more food items not found", 404));
    }

    items.map((item) => {
      const food = foods.find((f) => f._id.toString() === item.food.toString());

      totalAmount += food.price * item.quantity;
    });

    const newOrder = await Order.create({
      customer: req.user._id,
      restaurant,
      items,
      status,
      totalAmount,
      address,
      phone,
    });
    await newOrder.save();

    const orderData = await Order.findById(newOrder._id).populate("items.food");
    res.status(201).json({
      success: true,
      message: "Order added successfully!",
      order: orderData,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllOrder = async (req, res, next) => {
  try {
    let {
      page = 1,
      limit = 10,
      status,
      search,
      sort = "createdAt",
      order = "desc",
    } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        {
          address: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const sortoption = {
      [sort]: order === "asc" ? 1 : -1,
    };
    const totalOrder = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate("customer", "name email")
      .populate("restaurant", "restaurant")
      .populate("items.food", "food price")
      .sort(sortoption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    if (order.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "order note found" });
    }
    res.status(200).json({
      success: true,
      message: "order founds",
      totalOrder: totalOrder,
      page: page,
      limit,
      totalPages: Math.ceil(totalOrder / limit),
      orders,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return next(new HttpError("Order not found", 404));
    }

    let allowedFields = [];

    if (req.user.role === "customer") {
      if (order.customer.toString() !== req.user._id.toString()) {
        return next(new HttpError("Access denied", 403));
      }
      allowedFields = ["address", "phone"];
    }

    if (req.user.role === "provider") {
      const restaurant = await restaurantModel.findOne({
        _id: order.restaurant,
        owner: req.user._id,
      });

      if (!restaurant) {
        return next(new HttpError("access denied", 403));
      }
      allowedFields = ["status"];
    }

    if (req.user.role === "admin") {
      allowedFields = ["status", "address", "phone"];
    }

    const updates = Object.keys(req.body);

    const isValid = updates.every((field) => allowedFields.includes(field));

    if (!isValid) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      order[update] = req.body[update];
    });

    await order.save();

    res.status(200).json({
      success: true,
      message: "order data updated successfully!",
      order,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return next(new HttpError("Order not found", 404));
    }
    //customer -> only own order delete
    if (
      req.user.role === "customer" &&
      req.user._id.toString() !== order.customer.toString()
    ) {
      return next(new HttpError("Access denied", 403));
    }

    //provider -> only own restaurant's delete

    if (req.user.role === "provider") {
      const restaurant = await restaurantModel.findOne({
        _id: order.restaurant,
        owner: req.user._id,
      });

      if (!restaurant) {
        return next(new HttpError("Access denied", 403));
      }
    }

    //Admin -> can delete any order

    await order.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully!" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { orderAdd, getAllOrder, updateOrder, deleteOrder };
