import HttpError from "../middleware/HttpError.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

const add = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, isVarified } = req.body;
    const newUser = {
      name,
      email,
      password,
      role,
      phone,
      isVarified,
    };
    const user = new User(newUser);
    await user.save();

    res.status(201).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredential(email, password);

    if (!user) {
      return next(new HttpError("unable to login"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new HttpError("unable to login", 401));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return next(new HttpError("no user data found", 404));
    }
    res.status(200).json({
      success: true,
      message: "all user data fetched successfully!",
      users,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return next(new HttpError("user not found", 404));
    }
    res
      .status(200)
      .json({ success: true, message: "user logged in successfully!", user });
  } catch (error) {
    return next(new HttpError(error.message), 500);
  }
};
export default { add, login, getAllUsers, authLogin };
