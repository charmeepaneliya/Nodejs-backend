import mongoose from "mongoose";

const userSechma = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    Email:{},
    Password:{},
});

const User = mongoose.model("user",userSechma);

export default User;