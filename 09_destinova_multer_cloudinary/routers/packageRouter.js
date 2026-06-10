import express from "express";
import upload from "../middleware/uploads.js"; 
import packageController from "../controller/packageController.js";

const router = express.Router();

router.post("/add",upload.single("packageImage"),packageController.add);

router.get("/getallPakages",packageController.getAllPakages);

router.get("/:id",packageController.getById);

router.delete("/:id",packageController.deletePackage);

export default router;

