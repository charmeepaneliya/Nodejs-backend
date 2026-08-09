import express from "express";

//Controller
import blogController from "../controllers/blog.controller.js";

//middleware
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import upload from "../middleware/uploads.js";

//validation
import validate from "../middleware/validation.js";
import blogSchema, { updateBlogSchema } from "../validations/blog.validation.js";


const router = express.Router();

router.post("/blogAdd",auth,upload.single("image"),validate(blogSchema),blogController.add);

router.get("/getAllBlogs",auth,blogController.getAllBlogs);

router.get("/:id",auth,blogController.blogById);

router.patch("/:id",auth,upload.single("image"),validate(updateBlogSchema),blogController.updateBlog);

router.delete("/:id",auth,blogController.deleteBlog);

export default router;