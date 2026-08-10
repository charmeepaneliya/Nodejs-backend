import express from "express";

//controller

import restaurantController from "../controllers/restaurant.controller.js";

//middelware

import auth from "../middleware/auth.js";
import {restaurantImage} from "../middleware/uploads.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post(
  "/add",
  auth,
  checkRole("provider", "admin"),
  restaurantImage.single("restaurantImage"),
  restaurantController.add,
);

router.get("/allRestaurant", auth, restaurantController.getAllRestaurant);
router.patch("/update/:id", auth, restaurantController.updateRestaurant);
router.delete("/delete/:id", auth, restaurantController.deleteRestaurant);

export default router;
