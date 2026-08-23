

import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";

const providerSchema = new mongoose.Schema(
  {
    ownerName: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "resaurant",
      },
    ],

    documents:[
      {
      type: String,
      required: true,
    },
    ] ,
    cloudinary_id:[
      {
      type: String,
      required: true,
    },
    ] ,
    bancAccNumber: {
      type: String,
      required: true,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Provider = mongoose.model("Provider",providerSchema);

export default Provider;
