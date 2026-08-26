import Joi from "joi";
import { Schema } from "mongoose";

const orderSchema = Joi.object({
  customer: Joi.string().required().message({
    "string.base": "customer ID must be a string",
    "any.required": "customer is required",
  }),
  restaurant: Joi.string().required().message({
    "string.base": "restaurant ID must be a string",
    "any.required": "restaurant is required",
  }),
  items: Joi.array()
    .items(
      Joi.object({
        food: Joi.string().required().message({
          "string.base": "food ID must be a string",
          "any.required": "food is required",
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          "number.base": "Quantity must be a number",
          "number.integer": "Quantity must be a integer",
          "number.min": "Quantity must be a at least 1",
          "any.required": "Quantity is required",
        }),
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Items must be an array",
      "array.min": "At least one food items is required",
      "any.required": "Items are required",
    }),

  totalAmount: Joi.number().min(0).messages({
    "number.base": "Total amount must be a number",
    "number.min": "Total amount cannot be negative",
  }),
});

export const updateOrderSchema = orderSchema
  .fork(["customer", "restaurant", "items", "totalAmount"])
  .fork(["address", "phone", "status"], (schema) => schema.forbidden());

export default restaurantSchema;
