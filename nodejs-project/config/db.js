import mongoose from "mongoose";

async function connectDB(){
    try{
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/employeeManagemantSystem");
        console.log("connect db");
        return connect;
    }catch{
        console.log(error.message);
    }
}
export default connectDB;