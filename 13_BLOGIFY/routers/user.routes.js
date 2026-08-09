import express from "express";

//Controller
import userController from "../controllers/user.controller.js";

//middleware
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";
import upload from "../middleware/uploads.js";

//validation
import validate from "../middleware/validation.js";
import userSchema from "../validations/user.validation.js";


const router = express.Router();

router.post("/add",upload.single("profilePic"),validate(userSchema),userController.add);

router.post("/login",userController.login);


router.post("/authLogin",auth,userController.authLogin);

//user update owen account
router.patch("/update",auth,upload.single("profilePic"),userController.updateUser)

//user delete owen account
router.delete("/deleteUser",auth,userController.deleteUser);

//admin only
router.get("/allUsers",auth,checkRole("admin"),userController.getAllUsers);

//admin -> user/admin account update
router.patch("/admin/updateUser/:id",auth,checkRole("admin"),upload.single("profilePic"),userController.updateUserByAdmin);

//admin -> user/admin account delete
router.delete("/admin/deleteUser/:id",auth,checkRole("admin"),userController.deleteUserByAdmin)

export default router;

