import express from "express";
import orderController from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add",auth,orderController.orderAdd);

export default router;