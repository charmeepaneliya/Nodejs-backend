import Joi from "joi";


const foodSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required().messages({
    "string.base": "food name must be in string formate",
    "string.min": "food name must be minimum 2 characters long",
    "string.max": "food name must be maximum 100 characters long",
    "any.required": "food name is required",
  }),

  description: Joi.string().min(5).max(100).trim().required().messages({
    "string.base": "food description must be in string formate",
    "string.min": "food description must be minimum 5 characters long",
    "string.max": "food description must be maximum 100 characters long",
    "any.required": "food description is required",
  }),

  price: Joi.string().hex().length(24).required().messages({
    "string.hex": "category must be a valid ID",
    "string.length": "category ID must be 24 characters long",
    "any.required": "price is required",
  }),

  restaurant: Joi.string().hex().length(24).required().messages({
    "string.hex": "restaurant must be a valid ID",
    "string.length": "restaurant ID must be 24 characters long",
    "any.required": "restaurant  is required",
  }),

  foodType: Joi.string().valid("veg", "nonvege").default("veg").messages({
    "any.only": "food type must be either veg or nonvege",
  }),

  owner: Joi.string().hex().length(24).required().messages({
    "string.hex": "owner must be a valid ID",
    "string.length": "owner ID must be 24 characters long",
    "any.required": "owner  is required",
  }),
});

export const updateFoodSchema = foodSchema.fork(
  ["name", "description", "price", "category", "foodType"],
  (schema) =>
    schema
      .optional()
      .fork(
        ["restaurent", "owner", "isVerified", "foodImage", "cloudinary_id"],
        (schema) => schema.forbidden(),
      ),
);

export default foodSchema;
