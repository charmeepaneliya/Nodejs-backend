import { Timestamp } from "bson";
import mongoose from "mongoose";

const userSechma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          return "password can't contain password word as password";
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("user", userSechma);

export default User;
