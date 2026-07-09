import express from "express";
import userController from "../controllers/user.controller.js";
import validate from "../middleware/validation.js";
import userSchema from "../validation/register.schema.js";

const router = express.Router();

router.post("/add",userController.add);

router.post("/login",userController.login);

export default router;