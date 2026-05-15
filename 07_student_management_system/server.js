import express from "express";

import HttpError from "./middleware/httpError.js";
import connectDB from "./config/db.js";

// import { message } from "statuses";
// import { error } from "node:console";

const app = express();

app.use("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.use((req, res, next) => {
  return next(new HttpError("request route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).json({ message: error.message || "internal server error" });
});

const port = 5000;

async function startServer() {
  try {
   const connect = await connectDB();
    
   if(!connect){
    throw new Error("failed to connect db");
   }

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
