import express from "express";
import orderController from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";


const router = express.Router();

router.post("/add",auth,orderController.orderAdd);

router.get("/getAll",auth,checkRole("admin"),orderController.getAllOrder);

router.patch("/update/:id",auth,checkRole("admin","provider","customer"),orderController.updateOrder);

router.delete("/delete/:id",auth,checkRole("admin","provider","customer"),orderController.deleteOrder);

export default router;