import mongoose from "mongoose";

async function connectDB(){
    try {
        const connect = await monggose.connect(process.env.MONGO_URI);
        console.log("DB connected");
        return connect;
    } catch (error) {
        throw new Error(error.message);
        
    }
}
export default connectDB;