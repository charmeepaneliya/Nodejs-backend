import express from "express";

//controller
import userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

//validation
import validate from "../middleware/validation.js";
import userSchema from "../validation/register.schema.js";

//routers

const router = express.Router();

router.post("/add",userController.add);

router.post("/login",userController.login);

router.get("/getAllUsers",auth,userController.getAllUsers);

router.post("/authLogin",auth,userController.authLogin);

router.post("/logOut",auth,userController.logOut);

router.post("/logOutAll",auth,userController.logOutAll);

export default router;