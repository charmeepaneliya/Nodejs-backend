
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  totalAmount: {
    type: Number,
    // required: true,
  },

  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "preparing",
      "out for delivery",
      "delivered",
      "cancelled",
      "reject",
    ],
    default: "pending",
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
},{
    timestamps:true,
});

const Order = mongoose.model("Order",orderSchema);

export default Order;
