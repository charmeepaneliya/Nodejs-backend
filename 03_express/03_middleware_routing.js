

import express from 'express';

const app = express();

//Middleware (run before every request)

app.use((req,res,next)=>{
    console.log(`Request URL: ${req.url}`);
    next();
});

//Routing

app.get("/",(req,res)=>{
    res.send("Home page");
});

app.get("/about",(req,res)=>{
    res.send("About page");
});

app.get("/contact",(req,res)=>{
    res.send("contact page");
});

//server start

const port = 5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log(`server running on port ${port}`);
});