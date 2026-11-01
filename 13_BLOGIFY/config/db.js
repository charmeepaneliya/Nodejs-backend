// import mongoose from "mongoose";

// async function connectDB(){
//     try {
//         const connect = await mongoose.connect(process.env.MONGO_URI);
//         console.log("DB connected");
//         return connect;
//     } catch (error) {
//         throw new Error(error.message);
        
//     }
// }
// export default connectDB;

import mongoose from "mongoose";

async function connectDB(){
    try {
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/blogify");
        console.log("DB connected");
        return connect;
    } catch (error) {
        throw new Error(error.message);
        
    }
}
export default connectDB;