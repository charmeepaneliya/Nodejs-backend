import express from "express";

//controller
import userController from "../controllers/user.controller.js";

//middleware
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

//validation
import validate from "../middleware/validation.js";
import userSchema from "../validation/register.schema.js";
import upload from "../middleware/uploads.js";

//routers

const router = express.Router();

//admin can user data update and delete

router.patch("/update/:id",auth,checkRole("admin"),userController.updateUserByAdmin);

router.delete("/delete/:id",auth,checkRole("admin"),userController.deleteUserByDelete);

export default router;

