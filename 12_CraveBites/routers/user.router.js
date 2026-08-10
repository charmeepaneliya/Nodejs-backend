import express from "express";

//controller
import userController from "../controllers/user.controller.js";

//middleware
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import { profilePic } from "../middleware/uploads.js";

//validation
import validate from "../middleware/validation.js";
import userSchema from "../validation/register.schema.js";



//routers

const router = express.Router();

// router.post("/add",upload.single("profilePic"),validate(userSchema), userController.add);

router.post(
  "/add",
  profilePic.single("profilePic"),
  validate(userSchema),
  userController.add
);

router.post("/login", userController.login);

router.get("/getAllUsers", auth, userController.getAllUsers);

router.post("/authLogin", auth, userController.authLogin);

router.post("/logOut", auth, userController.logOut);

router.post("/logOutAll", auth, userController.logOutAll);

router.patch("/update", auth, userController.updateUser);



router.delete("/delete",auth,userController.deleteUser);





export default router;
