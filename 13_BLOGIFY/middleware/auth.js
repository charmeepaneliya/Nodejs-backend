import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import HttpError from "./HttpError.js";

const auth = async(req,res,next)=>{
    try {
        const authHeader = req.header("Authorization");
        if(!authHeader){
            return next(new HttpError("auth header is required"));
        }
        const token = authHeader.replace("Bearer ","");

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findOne({
            _id:decode._id,
            "tokens.token":token,
        });
        if(!user){
            return next(new HttpError("authentication failed",400));
        }
        req.user = user;
        req.token =token;

        next();

    } catch (error) {
        throw new Error(error.message,500);
        
    }
};
export default auth;