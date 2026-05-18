import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    grId: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    course: {
        type: String,
        enum: ["fullStack","UI/UX","Graphic design","Data science"],
        required: true,
    },
    isActive: {
        type: String,
        enum: ["active","pending","suspend","hold"],
        default: "active",
    },
    mobileNumber: {
        type: Number,
        minlength: 10,
        required: true,
    },
});

const Student = mongoose.model("studentData",studentSchema);

export default Student;