//third party or external module
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

import dotenv from "dotenv";

//dotenv config
dotenv.config({path:"./.env"});

//local methods
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";

// routers
import userRouter from "./routers/user.router.js";
import adminRouter from "./routers/admin.router.js";
import restaurantRoutes from "./routers/restaurant.router.js";
import orderRouter from "./routers/order.route.js";
import providerRouter from "./routers/provider.router.js";

import foodRouter from "./routers/food.router.js";

// models
import restaurantModel from "./models/restaurant.model.js";
import User from "./models/User.model.js";


const app = express();
app.use(helmet());
app.use(hpp());
app.use(cors());

app.use(express.json());

app.use(rateLimit());
const limiter = rateLimit({
  windowMs:15*60*1000,
  max:100,
});
app.use(limiter);


app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use("/restuarant",restaurantRoutes);
app.use("/food",foodRouter);
app.use("/order",orderRouter);
app.use("/provider",providerRouter);
//server check
app.get("/",(req,res)=>{
    res.json("hello from server");
});

//if route not found
app.use((req,res,next)=>{
    return next(new HttpError("requested route not found"));
});

//centralize error handaling
app.use((error,req,res,next)=>{
    if(res.headersSent){
        return next(error);
    }
    res.status(error.statusCode || 500).json({message:error.message || "internal server error"});
});

async function startServer() {
  try {
    const connect = await connectDB();
    if (!connect) {
      throw new Error("failed to connect db");
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

//Relationship concept

// async function checkRestaurant(){
//     try {
//       const restaurant = await restaurantModel.findById("6a6999f78f12b9de437d0e0b").populate("owner","name email phone -_id");
//       // console.log("restaurant",restaurant);
//       // console.log("restaurant",restaurant.owner);

//       //using manualy
//       const owner = await User.findById(restaurant.owner);

//       console.log("owner",owner);
//     } catch (error) {
//       console.log(error);
//     }
// }
// checkRestaurant()


async function virtualRestaurant(){
  try {
    const owner = await User.findById("6a5f177c9b9606c20e0bc133").populate("restaurant");
    // console.log("restaurant owner",owner);
    // console.log("restaurant",owner);
    console.log("restaurant",owner.restaurant);
    
  } catch (error) {
    console.log(error)
  }
}
virtualRestaurant();
