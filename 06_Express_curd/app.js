import express from "express";
import HttpError from "./middleware/httpError.js";

const taskList = [
  {
    id: 1,
    task: "learn",
    description: "you have to learn new topic",
  },
  {
    id: 2,
    task: "practice",
    description: "you have to practice this topic",
  },
];

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello from server");
});

app.get("/taskList", (req, res, next) => {
  if (taskList.length === 0) {
    return res
    .status(200)
    .json({ success: true, message: "no task data" });
  }
  res
    .status(200)
    .json({ message: true, message: "task data fetch successfully", taskList });
});

app.get("/task/:id",(req,res,next)=>{
  const id = Number(req.params.id);
 
  const task = taskList.find((t) => t.id === id);

  if(task.length === 0){
    return res.status(404).json({success:true,message:"no taskData found with this id"});
  }
  res.status(200).json({success:true,message:"task found",task});

});

app.use((req, res, next) => {
  return next(new HttpError("request route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.statusCode || 500).json({
    message: error.message || "somthing went wrong please try again later",
  });
});

const port = 5000;

app.listen(port, (err) => {
  if (err) {
    return console.log(err.message);
  }
  console.log(`server running on port ${port}`);
});
