
import express from 'express';

// const express = require('express'); ->commonjs

const app = express();

app.get("/",(req,res)=>{
    
    res.end("hello express js");
});

const port = 5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log(`sercer running on port ${port}`);
})