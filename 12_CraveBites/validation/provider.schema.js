import Joi from "joi";

const providerSchema = Joi.object({
  ownerName: Joi.string().min(2).max(30).trim().required().messages({
    "string.base": "ownerName must be in string formate",
    "string.min": "ownerName must be minimum 2 character long ",
    "string.max": "ownerName must be maximum  5 character long",
    
  }),
  restaurants: Joi.array().items(Joi.string().required()).required().messages({
    "array.base":"restaurants must be an array",
    "any.required":"restaurants are required"
  }),
  documents:Joi.array().items(Joi.string().required()).required().messages({
    "array.base":"documents must be an array",
    "any.required":"documents are required"
  }),
  bancAccNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": "bancAccNumber must be string",
      "string.pattern.base": "bancAccNumber must be a valid 9 to 18 digits",
      "any.required": "bancAccNumber is required",
    }),
    isVarified: Joi.boolean()
    .default(false),

  
});

export const updateProviderSchema = providerSchema
.fork(["ownerName","restaurants","documents","bancAccNumber"],(schema)=>schema.optional())
.fork(["isVarified"],(schema)=>schema.forbidden());

export default providerSchema;
