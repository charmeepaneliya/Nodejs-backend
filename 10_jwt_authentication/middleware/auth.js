import jwt from "jsonwebtoken";

import User from "../models/User.js";

import HttpError from "./HttpError.js";

const auth = async (req, res, next) => {
  try {
    // console.log("------auth middleware start------");

    const authHeader = req.header("Authorization");
    console.log("Authorization header:",authHeader);

    if (!authHeader) {
      return next(new HttpError("please authentication", 401));
    }

    const token = authHeader.replace("Bearer ", "");
    console.log("extracted token:",token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT Secret:", process.env.JWT_SECRET);
    // console.log("decoded token:",decoded);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    // console.log("user found:",user);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }

    req.user = user;
    req.token = token;

    // console.log("req.user:",req.user);
    // console.log("req.token:",req.token);

    // console.log("-----auth success-----");

    next();
  } catch (error) {

    // console.log("----- auth error -----");
    // console.log(errror);
    // console.log("---------------------");
    
    return next(new HttpError(error.message, 500));
  }
};

export default auth;
