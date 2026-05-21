import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: true
    },
    Id:{
        type:String,
         required: true,
         unique:true
    },
    email:{
        type:String,
         required: true,
         unique:true
    },
    dept:{
        type:String,
         required: true,
         enum:["account","manager","development","designing"]
    },
    mobileNumber:{
        type: Number,
        required: true,
        minlength: 10
    }
});

const Employee = mongoose.model("employeeData",employeeSchema);

export default Employee;




