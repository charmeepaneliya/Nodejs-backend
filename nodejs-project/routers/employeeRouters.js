import express from "express";
import employeeControllor from "../controllor/employeeControllor.js";



const router = express.Router();


router.post("/add",employeeControllor.add);

router.get("/getAllEmployee",employeeControllor.getAllEmployee);

router.delete("/deleteAllData",employeeControllor.deleteAllData);

router.get("/:id",employeeControllor.getEmployeeById);

router.delete("/:id",employeeControllor.deleteEmployeeData);

router.patch("/:id",employeeControllor.updateEmployeeData);


export default router;