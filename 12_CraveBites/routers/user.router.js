import express from "express";

//controller
import userController from "../controllers/user.controller.js";

//validation
import validate from "../middleware/validation.js";
import userSchema from "../validation/register.schema.js";

//routers

const router = express.Router();

router.post("/add",userController.add);

router.post("/login",userController.login);

router.get("/getAllUsers",userController.getAllUsers);

router.get("/authLogin",userController.authLogin);

export default router;