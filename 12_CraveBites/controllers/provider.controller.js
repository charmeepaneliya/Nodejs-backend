import Provider from "../models/provider.model.js";
import HttpError from "../middleware/HttpError.js";
import User from "../models/User.model.js";

const registerAsProvider = async(req,res,next)=>{
    try {
         const user = await User.findById(userId);
    
    const existingProvider = await Provider.findById(userId);

    if(!existingProvider){
        return next(new HttpError("already register as provider",400));
    }
    const {restaurant,bankAccNumber}=req.body;

    const newProvider = await Provider.create({
        restaurant,bancAccNumber,
        documents:req.file.map((file)=>FileReader.path),
        cloudinary_id:req.file.map((file)=>file.filename),
    });
    user.role = "provider";

    await user.save();

    res.status(201).json({success:true,message:"provider register",newProvider})
    } catch (error) {
        next(new HttpError(error.message,500));
    }
   
}

export default {registerAsProvider};