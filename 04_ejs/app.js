
import express from  "express";

const app = express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended: true}));


let studentList = [
    {   
        id:1,
        name:"alice"
    },
    {
        id:2,
        name:"joe"
    }
];

app.get("/",(req,res)=>{
    res.render("index",{studentList});
});

app.get("/add",(req,res)=>{
    res.render("add");
});

app.post("/add",(req,res)=>{
    const {name} = req.body;

    const newStudent = {
        id: new Date().getTime(),
        name
    };

    studentList.push(newStudent);

    res.redirect("/");
});

//--------- Delete----------

app.get("/delete/:id",(req,res)=>{

    const id = Number(req.params.id);

    studentList = studentList.filter(s => s.id !== id);

    res.redirect("/");
});

//---------Edit---------

app.get("/edit/:id",(req,res)=>{

    const id = Number(req.params.id);

    const student = studentList.find(s => s.id === id);

    res.render("edit",{student});
});

//---------Update---------

app.post("/edit/:id",(req,res)=>{
    const id = Number(req.params.id);
    const {name} = req.body;

    const student = studentList.find(s => s.id === id);
    
    if(student){
        student.name = name;
    }

    res.redirect("/");
});

const port = 5000;

app.listen(port,(err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log(`server running on port ${port}`);
});