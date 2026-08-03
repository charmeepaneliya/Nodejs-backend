import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(5).trim().required().messages({
    "string.base": "nmae must be in string formate",
    "string.min": "name must be minimum 2 character long ",
    "string.max": "name must be maximum  5 character long",
    
  }),
  email: Joi.string().email().required().messages({
    "any.required": "email is required",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.base": "password must be in string formate",
    "string.min": "password must be minmum 6 character",
    "string.max": "password must be maximum 6 character",
    "any.required": "password is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": "phone number must be string",
      "string.pattern.base": "phone number must be a valid 10-digit",
      "any.required": "phone number is required",
    }),

  role: Joi.string()
    .valid("user","admin")
    .default("user")
    .required()
    .messages({
      "any.required": "role is required",
    }),

    address:Joi.string().min(10).max(100).required(),
});

export const updateUserSchema = userSchema
.fork(["name","phone","address"],(schema)=>schema.optional())
.fork(["email","password","role"],(schema)=>schema.forbidden());

export default userSchema;