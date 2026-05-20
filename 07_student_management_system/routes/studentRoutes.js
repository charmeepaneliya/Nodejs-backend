
import express from "express";

import studentController from "../controller/studentController.js";

const router = express.Router();

router.post("/add",studentController.add);

router.get("/getAllStudents",studentController.getAllStudentData);

router.delete("/deleteAllData",studentController.deleteAllData);

router.get("/:id",studentController.getStudentdById);

// router.patch("/:id",studentController.updateStudentData);

router.patch("/:id",studentController.updateManuallyData);

router.delete("/:id",studentController.deleteStudentData);



export default router;
