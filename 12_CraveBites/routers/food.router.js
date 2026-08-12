import express from "express";

import foodController from "../controllers/food.controller.js";
import { foodImage } from "../middleware/uploads.js";

const router = express.Router();

router.post("/addFood",foodImage.array("foodImage",5),foodController.add);

export default router;