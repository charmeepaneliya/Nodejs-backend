
import express from "express";

import studentController from "../controller/studentController.js";

const router = express.Router();

router.post("/add",studentController.add);

router.get("/getAllStudents",studentController.getAllStudentData);

export default router;
