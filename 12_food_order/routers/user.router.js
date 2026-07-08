import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/add",userController.add);

export default router;