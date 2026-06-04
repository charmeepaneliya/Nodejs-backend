import express from "express";
import Pakesge from "../models/Package.js";
import fs from "fs";

import HttpError from "../middleware/HttpError.js";

const create = async(req,res,next) =>{
    try {
        const {packageName,startdDate,endDate,packagePrice} = req.body;

        const packageImages = req.file?.packageImages[0]?.path || null;

        if(!startdDate || endDate){
            return next(new HttpError("start date and end date is required", 400));
        }

        const newPackage = new Pakesge({
            packageName,startdDate,endDate,packagePrice
        });

        await newPackage.save();

        res.status(201).json({success:true,message:"new package added successfully!",newPackage});
    } catch (error) {
        return next(new HttpError(error.message));
    }
};