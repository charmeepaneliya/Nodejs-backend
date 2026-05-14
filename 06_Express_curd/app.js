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

//read

app.get("/taskList", (req, res, next) => {
  if (taskList.length === 0) {
    return res.status(200).json({ success: true, message: "no task data" });
  }
  res
    .status(200)
    .json({ success: true, message: "task data fetch successfully", taskList });
});

//

app.get("/task/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const task = taskList.find((t) => t.id === id);

  if (!task) {
    return res
      .status(404)
      .json({ success: false, message: "no taskData found with this id" });
  }
  res.status(200).json({ success: true, message: "task found", task });
});

//create

app.post("/addTask", (req, res, next) => {
  const { task, description } = req.body;

  if (!task || !description) {
    return next(new HttpError("task or description are required", 404));
  }

  const newTask = {
    id: new Date().getTime(),
    task,
    description,
  };
  taskList.push(newTask);
  res.status(201).json({
    success: true,
    message: "new Task data added successfully",
    newTask,
  });
});

//update using patch partially update only user defined field from body will be update or reset will remain as it is

app.patch("/updateTask/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const taskData = taskList.find((t) => t.id === id);

  if (!taskData) {
    return next(new HttpError("task not found", 404));
  }

  const { task, description } = req.body;

  if (task) {
    taskData.task = task;
  }

  if (description) {
    taskData.description = description;
  }

  if (!task || !description) {
    return next(new HttpError("task or descfiption data is required ", 400));
  }

  res
    .status(200)
    .json({
      success: true,
      message: "task data updated successfully",
      taskData,
    });
});

//PUT method

app.put("/updateTask/:id", (req, res, next) => {
  const id = Number(req.params.id);

  const taskDataIndex = taskList.findIndex((t) => t.id === id);
  

  if (taskDataIndex === -1) {
    return next(new HttpError("task data with this id not found", 404));
  }

  const { task, description } = req.body;

  // if (!task || !description) {
  //   return next(new HttpError("task or description is required", 400));
  // }

  //copying old data

  taskList[taskDataIndex] = { ...taskList[taskDataIndex], task, description };

  res
    .status(200)
    .json({
      success: true,
      message: "task data updated successfully",
      updatedTask: taskList[taskDataIndex],
    });
  });

//delete

app.delete("/task/:id",(req,res,next)=>{
  const id = Number(req.params.id);

  const Index = taskList.findIndex((t)=>(t.id === id));

  if(Index === -1){
    return next(new HttpError("task not found with this id",404));
  }

  taskList.splice(Index,1);

  res.status(200).json({success:true,message:"task deleted successfully"});
});

//

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
