import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(2).max(5).trim().required().messages({
    "string.base": "nmae must be in string formate",
    "string.min": "name must be minimum 2 character long ",
    "string.max": "name must be maximum  5 character long",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Name is required",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.base":"password must be in string formate",
    "string.min": "password must be minmum 6 character",
    "string.max": "password must be maximum 6 character",
    "any.required": "Name is required",
  }),

  phone:Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    "string.base":"phone number must be string",
    "string.pattern.base":"phone number must be a valid 10-digit",
    "any.required":"phone number is required",
  }),

  role: Joi.string().valid("customer","provider").default("customer").required().messages({
    "any.required": "Name is required",
  }),
});
export default userSchema;