import mongoose from "mongoose";

async function connectDB(){
    try {
        const connect = mongoose.connect(process.env.MONGO_URI);
        console.log("connected DB");
        return connect;
    } catch (error) {
        throw new Error(error.message);
    }
}

export default connectDB;