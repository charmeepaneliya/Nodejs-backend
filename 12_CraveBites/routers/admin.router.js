import express from "express";

//controller

import adminController from "../controllers/admin.controller.js";

//middleware
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

//validation
import validate from "../middleware/validation.js";
import userSchema from "../validation/register.schema.js";
import upload from "../middleware/uploads.js";

//routers

const router = express.Router();


router.get("/verified",auth,checkRole("admin"),adminController.getAllVerifiedData)

export default router;

