
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({

    restaurantName:{
        type:String,
        required:true,
        trim:true,
    },
    
    description:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    restaurantImage:{
        type:String,
    },
    // category:{
    //     type:String,
    //     enum:["Indian","Chinese","Italian","Fast Food","Cafe","Dessert"],
    //     required:true,
    // },
    openingTime:{
        type:String,
    },
    closingTime:{
        type:String,
    },
    isOpen:{
        type:Boolean,
        default:true,
    },
    cloudinary_Id:{
        type:String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
},
{
   timestamps:true, 
});

const restaurantModel = mongoose.model("Restaurant",restaurantSchema);

export default restaurantModel;