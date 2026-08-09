import Joi from "joi";

const blogSchema = Joi.object({
  title: Joi.string().min(3).max(100).trim().required().messages({
    "string.base": "title must be in string formate",
    "string.min": "title must be minimum 2 character long ",
    "string.max": "title must be maximum  5 character long",
    "any.required": "title is required",
  }),

  description: Joi.string().min(10).max(1000).trim().required().messages({
    "string.base": "description must be in string formate",
    "string.min": "description must be minimum 2 character long ",
    "string.max": "description must be maximum  5 character long",
    "any.required": "description is required",
  }),

  category: Joi.string().min(2).max(30).required().messages({
    "string.base": "category must be in string formate",
    "string.min": "category must be minimum 2 character long ",
    "string.max": "category must be maximum  5 character long",
    "any.required": "category is required",
  }),
});

export const updateBlogSchema = blogSchema.fork(
  ["title", "description", "category"],
  (schema) => schema.optional(),
);

export default blogSchema;
