
import express from 'express';

const app = express();

app.get("/",(req,res)=>{
    res.send("welcome to express js");
});

const port = 5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log(`sercer running on port ${port}`);
})