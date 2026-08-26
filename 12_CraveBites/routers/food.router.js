import express from "express";

import foodController from "../controllers/food.controller.js";
import { foodImage } from "../middleware/uploads.js";
import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/addFood",foodImage.array("foodImage",5),foodController.add);

router.get("/allFood",auth,foodController.getAllFood);

router.patch("/update/:id",auth,checkRole("admin","provider"),foodController.updateFood);

router.delete("/delete/:id",auth,checkRole("admin","provider"),foodController.deleteFood);

export default router;