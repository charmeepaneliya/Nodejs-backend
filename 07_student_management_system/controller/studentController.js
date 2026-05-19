

import HttpError from "../middleware/httpError.js"; 

import Student from "../model/Student.js";

//create student data

const add = async (req,res,next)=>{
    try{
        const { name,grId,email,course,isActive,mobileNumber } = req.body;

        const newStudent = await new Student({
            name,grId,email,course,isActive,mobileNumber,
        });

        await newStudent.save();

        res.status(201).json({success:true,message:"student data added successfully",newStudent});
    }catch(error){
        next(new HttpError(error.message,500));
    }
    
};

//read student data

const getAllStudentData = async (req,res,next)=>{
    try{
        const students = await Student.find({});

        if(students.length <= 0){
            res.status(200).json({success:true,message:"no student data found"});
        }
        res.status(200).json({success:true,message:"student data fetched successfully",students});
    }catch(error){
        next(new HttpError(error.message,500));
    }
};

//get student by id

const getStudentdById = async (req,res,next)=>{
    try{
        const {id} = req.params;

        const student = await Student.findById(id);

        if(!student){
            return next(new HttpError("student not found with this id",404));
        }

        res.status(200).json({success:true,message:"student data fetched successfully",student});
    }catch (error){
        next(new HttpError(error.message,500));
    }
};

//update student data

const updateStudentData = async (req,res,next)=>{
     try{
        const {id} = req.params;

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        );

        if(!updatedStudent){
            return next(new HttpError("student not found with this id",404));
        }
         res.status(200).json({success:true,message:"student data updated successfully",updatedStudent});
    }catch (error){
        next(new HttpError(error.message,500));
    }
}

//delete student data

const deleteStudentData = async (req,res,next)=>{
     try{
        const {id} = req.params;

        const deleteStudent = await Student.findByIdAndDelete(id);

        if(!deleteStudent){
            return next(new HttpError("student not found with thid id",404));
        }
         res.status(200).json({success:true,message:"student data deleted successfully"});
    }catch (error){
        next(new HttpError(error.message,500));
    }
}

export default {add,getAllStudentData,getStudentdById,deleteStudentData,updateStudentData};