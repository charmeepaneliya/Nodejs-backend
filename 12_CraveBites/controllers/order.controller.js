import HttpError from "../middleware/HttpError.js";
import Food from "../models/food.model.js";
import order from "../models/order.model.js";

const add = async (req, res, next) => {
  try {
    const { restaurant, items, status, address, phone } = req.body;
    let totalAmount = 0;
    const item = await Food.findById(item.Food);
    if (!item) {
      return next(new HttpError("item not found", 404));
    }

    //totalAmount = quantity * price

    totalAmount = totalAmount + item.price * item.quantity;

    const order = new Order({
      restaurant,
      items,
      totalAmount,
      address,
      phone,
    });
    await order.save();
    res
      .status(201)
      .json({ success: true, message: "Order added successfully!", order });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add };
