import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import userRouter from "./router/user.router.js";

import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json("hello form server");
});

app.use((req, res, next) => {
  return next(new HttpError("request route not found", 404));
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.statusCode || 500)
    .json({ message: error.message || "interver server error" });
});

async function startServer() {
  try {
    const connect = await connectDB();
    if (!connect) {
      throw new Error("failed connectDB");
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
