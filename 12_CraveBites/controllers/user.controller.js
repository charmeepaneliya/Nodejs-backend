import HttpError from "../middleware/HttpError.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

const add = async (req,res,next)=>{
    try {
          
        const {name,email,password,role,phone,isVarified}=req.body;
        const newUser = {
            name,email,password,role,phone,isVarified
        }
        const user = new User(newUser);
        await user.save();

        res.status(201).json({success:true,user});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
};

const login = async (req,res,next)=>{
    try {
        const {email,password}=req.body;

        const user = await User.findByCredential(email,password);

        if(!user){
            return next(new HttpError("unable to login"));
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return next(new HttpError("unable to login",401));
        }

        const token = await user.generateAuthToken();
        
        res.status(200).json({success:true,user});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

export default {add , login};