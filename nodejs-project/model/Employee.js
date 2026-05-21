import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true,
        trim:true
    },
    Id:{
        type:String,
         required: true,
         unique:true,
         trim:true
    },
    email:{
        type:String,
         required: true,
         unique:true,
         trim:true
    },
    dept:{
        type:String,
         required: true,
         enum:["account","manager","development","designing"]
    },
    mobileNumber:{
        type: String,
        required: true,
        minlength: 10
    }
});

const Employee = mongoose.model("employeeData",employeeSchema);

export default Employee;




