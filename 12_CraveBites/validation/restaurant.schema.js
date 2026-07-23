import Joi from "joi";

const restaurantSchema = Joi.object({
  restaurantName: Joi.string().min(3).max(50).trim().required().message({
    "string.base": "Restaurant name must be a string",
    "string.min": "Restaurant name must be minimum 3 characters",
    "string.max": "Restaurant must be maximum  50 character long",
    "any.required": "Restaurant is required",
  }),
  description: Joi.string().min(10).max(500).trim().required().message({
    "string.min": "description must be minimum 10 character long ",
    "string.max": "description must be maximum  500 character long",
    "any.required": "description is required",
  }),
  address: Joi.string().min(2).max(50).trim().required().message({
    "any.required": "address is required",
  }),
  city: Joi.string().min(2).max(50).trim().required().message({
    "any.required": "city is required",
  }),
  state: Joi.string().min(2).max(50).trim().required().message({
    "any.required": "state is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": "phone number must be string",
      "string.pattern.base": "phone number must be a valid 10-digit",
      "any.required": "phone number is required",
    }),

  openingTime: Joi.string().required().message({
    "any.required": "openingTime is required",
  }),
  closingTime: Joi.string().required().message({
    "any.required": "closingTime is required",
  }),
  isOpen: Joi.boolean().default(true),

  owner: Joi.string().required().message({
    "any.required": "owner ID is required",
  }),
});

export default restaurantSchema;
