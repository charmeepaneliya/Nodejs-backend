
import mongoose from "mongoose";

const auditSchema =  new mongoose.Schema({
    action:{
        type:String,
        required:true,
    },
     performedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    module:{
        type:String,
        required:true,
    },
    targetedId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    Ip:{
        type:String,
        required:true,
    },
    userAgent:{
        type:String,
        required:true,
    }
});

const audit = mongoose.model("audit",auditSchema);

export default auditSchema;