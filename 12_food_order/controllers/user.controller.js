import HttpError from "../middleware/HttpError.js";
import User from "../models/User.model.js";

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

export default {add};