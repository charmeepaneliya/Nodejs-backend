import express from "express";

import userController from "../controller/userController.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add",userController.add);

router.get("/getAllUsers",auth,userController.getAllUsers);

router.post("/login",userController.login);

router.post("/authLogin",auth,userController.authLogin);

router.delete("/userDelete",auth,userController.logOut );

router.delete("/allDelete",auth,userController.logOutAll);

router.patch("/userUpdate",auth,userController.userUpdate);

export default router;