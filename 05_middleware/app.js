
import express from "express";

import helmet from "helmet";

import HttpError from "./middleware/HttpError.js";

import checkRole from "./middleware/checkRole.js";

const app = express();

//1. application level

app.use(express.json());

//2.route level

app.get("/",(req,res)=>{
    res.send("hello from server");
});
app.get("/about",(req,res)=>{
    res.send("this is about route");
});
app.get("/admin",(req,res,next)=>{
    res.send("this is admin route");
    next();
});

//3.undefined route handaling

app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }

    res
        .status(error.statusCode || 500)
        .json(error.message || "internal server error please try again later");
});

const port = 5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message);

    }
    console.log(`server running on port ${port}`);
});