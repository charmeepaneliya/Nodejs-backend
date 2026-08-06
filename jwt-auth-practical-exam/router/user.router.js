import express from "express";
import userController from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/allUsers", auth, userController.getAllUser);

router.post("/authLogin", auth, userController.authLogin);
//by user-customer
router.delete("/delete", auth, userController.userDelete);
//by admin
router.delete(
  "/delete/:id",
  auth,
  checkRole("admin"),
  userController.deleteUserByAdmin,
);
router.patch("/updateUser/:id", auth, userController.updateUserByAdmin);

export default router;
