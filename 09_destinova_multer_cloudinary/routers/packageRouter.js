import express from "express";
import packageController from "../controller/packageController.js";

const router = express.Router();

router.post("/create",
    uploads.fields([
        {name:"packageImages",maxCount:5}
    ]),
    packageController.create,
);