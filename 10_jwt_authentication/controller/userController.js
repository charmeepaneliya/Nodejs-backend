import User from "../models/User.js";
import HttpError from "../middleware/HttpError.js";
import { message } from "statuses";

const add = async (req, res, next) => {
  try {
    const { name, Email, Password } = req.body;

    const newUser = { name, Email, Password };

    await newUser.save();

    res
      .status(201)
      .json({
        success: true,
        message: "user added successfully!",
        data: newUser,
      });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default { add };
