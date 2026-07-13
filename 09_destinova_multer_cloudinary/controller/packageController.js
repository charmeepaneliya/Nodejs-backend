import express from "express";
import Package from "../models/Package.js";
import fs from "fs";

import HttpError from "../middleware/HttpError.js";
import cloudinary from "../config/cloudinary.js";

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

    const newPackage = new Package({
      packageName,
      startdDate,
      endDate,
      packageDuration,
      destination,
      packagePrice,
      packageType,
      packageImages: req.file.path,
      cloudinary_id: req.file.filename,
    });

    await newPackage.save();

    res.status(201).json({
      success: true,
      message: "new package added sucessfully!",
      newPackage,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllPakages = async (req, res, next) => {
  try {
    const packages = await Package.find({});

    if (packages.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "no packages found", data: null });
    }
    res.status(200).json({
      success: true,
      message: "all packages data fatch successfully",
      data: packages,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const packagesById = await Package.findById(id);

    if (!packagesById) {
      return next(new HttpError("no pakage data found", 404));
    }
    res
      .status(200)
      .json({ success: true, message: "package data found", data: packagesById });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deletePackage = async (req,res,next) =>{
  try {
    const id = req.params.id;

    const packageDelete = await Package.findById(id);

    if(!packageDelete){
      return next(new HttpError("no pakage data found",404));
    }

    await cloudinary.uploader.destroy(
      packageDelete.cloudinary_id
    );

    await Package.findByIdAndDelete(id);

    res.status(200).json({success:true,message:"pakage deleted successfully"});
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
}


const updatePackageDetail = async (req, res, next) => {
  try {
    const id = req.params.id;

    const TravelPackage = await Packages.findById(id);

    if (!TravelPackage) {
      return next(new HttpError("package not found", 404));
    }

    const updates = Object.keys(req.body);

    const allowedFields = [
      "packageName",
      "price",
      "startDate",
      "endDate",
      "duration",
      "destination",
      "packageType",
    ];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 500));
    }

    updates.forEach((update) => {
      TravelPackage[update] = req.body[update];
    });

    if (req.file) {
      await cloudinary.uploader.destroy(TravelPackage.cloudinary_id);

      TravelPackage.packageImage = req.file.path;
      TravelPackage.cloudinary_id = req.file.filename;
    }

    await TravelPackage.save();

    res.status(200).json({
      success: true,
      message: "package data updated successfully",
      TravelPackage,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};
export default { add, getAllPakages, getById, deletePackage };
