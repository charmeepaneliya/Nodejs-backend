//Third party  or external modules

import express from "express";
import dotenv from "dotenv";

//dotenv config
dotenv.config({path:"./.env"});

//local modules
import userRouter from "./routers/user.routes.js";
import blogRouter from "./routers/blog.routs.js";

//middleware //local methods
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());

//server check
app.get("/",(req,res)=>{
    res.json({message:"Blogify API is running"});
});

app.use("/user",userRouter);
app.use("/blog",blogRouter);


//if route not found
app.use((req,res,next)=>{
    return next(new HttpError("requested route not found"));
});

//centralize error handaling
app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }
    res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
});

async function startServer() {
  try {
    const connect = await connectDB();
    if (!connect) {
      throw new Error("failed to connect db");
    }
    const port = process.env.PORT || 5000;

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }

      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();
