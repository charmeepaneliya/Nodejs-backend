import Blog from "../models/blog.model.js";
import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";
import Joi from "joi";

const add = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    const newBlog = {
      title,
      description,
      category,
      author: req.user._id,
      image: req.file ? req.file.path : null,
      cloudinary_id: req.file ? req.file.filename : null,
    };
    const blog = new Blog(newBlog);
    await blog.save();

    res
      .status(201)
      .json({ success: true, message: "Blog added successfully!", blog });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().populate("author", "name email role");

    if (blogs.length === 0) {
      return next(new HttpError("No blog data found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "all blogs fetched", blogs });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};


const blogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate("author", "name email role");

    if (!blog) {
      return next(new HttpError("Blog not found", 404));
    }
    res
      .status(200)
      .json({ success: true, message: " blogs fetched successfully!", blog });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return next(new HttpError("no blog data found", 404));
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return next(new HttpError("you can deleted only your owen blog", 403));
    }

    if (blog.cloudinary_id) {
      await cloudinary.uploader.destroy(blog.cloudinary_id);
    }
    await Blog.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "blog deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(new HttpError("Blog not found", 404));
    }


    if (blog.author.toString() !== req.user._id.toString()) {
      return next(new HttpError("you can update only your owen blog", 403));
    }
    const updates = Object.keys(req.body);

    const allowedFields = ["title", "description", "category"];

    const isValid = updates.every((field) => allowedFields.includes(field));

    if (!isValid) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      blog[update] = req.body[update];
    });

    if (req.file) {
      if (blog.cloudinary_Id) {
        await cloudinary.uploader.destroy(blog.cloudinary_Id);
      }
      blog.image = req.file.path;
      blog.cloudinary_id = req.file.filename;
    }
    await blog.save();

    res.status(200).json({
      success: true,
      message: "blog data updated successfully!",
      blog,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add, getAllBlogs,blogById, deleteBlog, updateBlog };
