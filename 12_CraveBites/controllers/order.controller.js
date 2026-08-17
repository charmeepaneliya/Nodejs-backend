import HttpError from "../middleware/HttpError.js";
import Food from "../models/food.model.js";
import Order from "../models/order.model.js";

const orderAdd = async (req, res, next) => {
  try {
    const {customer, restaurant, items, status, address, phone } = req.body;
    let totalAmount = 0;
    
    const foodIds = items.map((item)=>{
      return item.food.toString();
    });

    const foods = await Food.find({
      _id:{$in:foodIds},

    });

    if(foods.length !== items.length){
      return next(new HttpError("One or more food items not found",404));
    }

    const total = items.map((item)=>{
      const food = foods.find((f)=>f._id.toString() === item.food.toString());

      totalAmount += food.price * item.quantity;
    });

    

    const newOrder = await Order.create({
      customer:req.user._id,
      restaurant,
      items,
      status,
      totalAmount,
      address,
      phone,
    });
    await newOrder.save();

    const orderData = await Order.findById(newOrder._id).populate("items.food");
    res
      .status(201)
      .json({ success: true, message: "Order added successfully!", order:orderData });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { orderAdd };
