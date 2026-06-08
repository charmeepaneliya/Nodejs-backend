import express from "express";
import Pakesge from "../models/Package.js";
import fs from "fs";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const {
      packageName,
      startdDate,
      endDate,
      packageDuration,
      destination,
      packagePrice,
      packageType,
    } = req.body;
   

    if (
      !packageName ||
      !startdDate ||
      !endDate ||
      !packageDuration ||
      !destination ||
      !packagePrice ||
      !packageType
    ) {
      return next(new HttpError("all fields are required"));
    }

    const packageImage = req.file.path;

    const newPackage = new Pakesge({
      packageName,
      startdDate,
      endDate,
      packageDuration,
      destination,
      packagePrice,
      packageType,
      packageImages: req.file.path,
    });

    await newPackage.save();

    res.status(201).json({success:true,message:"new package added sucessfully!",newPackage});
  } catch (error) {
    return next(new HttpError(error.message,500));
  }
};

export default {add};
