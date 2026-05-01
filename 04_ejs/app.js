
import express from  "express";

const app = express();

app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");

let studentList = [
    {name:"alice"},
    {name:"joe"}
];

app.get("/",(req,res)=>{
    res.render("index",{studentList});
});

app.get("/add",(req,res)=>{
    res.render("add");
});

app.post("/add",(req,res)=>{
    const name = req.body.name;

    studentList.push({
        
        name
    });

    res.redirect("/");
});

const port = 5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log(`server running on port ${port}`);
});