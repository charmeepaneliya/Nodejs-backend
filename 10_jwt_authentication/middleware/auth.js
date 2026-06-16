import jwt from "jsonwebtoken";

import User from "../models/User.js";

import HttpError from "./HttpError.js";

const auth = async(req,res,next)=>{
    try {
        const authHeader = req.header("Authorization");

        if(!authHeader){
            return next(new HttpError("please authentication",401));
        }

        const token = authHeader.replace("Bearer ","");

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findById(decoded._id);

        if(!user){
            return next(new HttpError("user not found",404));
        }

        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        return next(new HttpError(error.message,500));
    }
};

export  default auth;