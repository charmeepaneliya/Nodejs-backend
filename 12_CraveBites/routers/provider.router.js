import express from "express";
import providerController from "../controllers/provider.controller.js";
import auth from "../middleware/auth.js";
import { documents } from "./midleware/uploads.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/register",auth,documents.array("documents",3),providerController.registerAsProvider);

router.get("/getAll",auth,checkRole("admin"),providerController.getAllProviders);

router.patch("/update/:id",auth,checkRole("provider","admin",providerController.updateProvider));

export default router;