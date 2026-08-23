import express from "express";
import providerController from "../controllers/provider.controller.js";
import auth from "../middleware/auth.js";
import { documents } from "../middleware/uploads.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/register",auth,documents.array("documents",3),providerController.registerAsProvider);

router.get("/getAll",auth,checkRole("admin"),providerController.getAllProviders);

router.patch("/update",auth,checkRole("provider"),documents.array("documents",3),  providerController.updateProvider);

router.patch("/update/:id",auth,checkRole("admin"), documents.array("documents",3), providerController.updateProvider);

router.delete("/delete/:id",auth,checkRole("admin"),providerController.deleteProvider);

router.delete("/delete",auth,checkRole("provider"),providerController.deleteProvider);




export default router;