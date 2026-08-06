import HttpError from "../middleware/HttpError.js";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = {
      name,
      email,
      password,
    };

    const user = new User(newUser);
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "user added successfully!", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);
    if (!user) {
      throw new Error("unable to user");
    }

    const token = await user.generateAuthToken();
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();

    if (user.length === 0) {
      return next(new HttpError("no data found", 404));
    }
    res.status(201).json({
      success: true,
      message: "user logged in successfully!",
      total: user.length,
      user,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  try {
    const user = req.user;

    if (user.length === 0) {
      return next(new HttpError("no data found", 404));
    }
    res
      .status(201)
      .json({ success: true, message: "user logged in successfully!", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const userDelete = async (req, res, next) => {
  try {
    const user = req.user;
    await user.deleteOne();

    res
      .status(201)
      .json({ success: true, message: "user deleted successfully!" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteUserByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id || req.user.id;

    const user = await User.findById(id);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }
    await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "customer deleted successfully!" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const logout = async (req, res, next) => {
  try {
    req.user.tokens = await req.user.tokens.filter((t) => t.token != req.token);
    await req.user.save();

    res
      .status(201)
      .json({ success: true, message: "user logOut successfully!", user });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateUserByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id || req.user.id;

    const adminUpdateUser = await User.findById(id);
    if (!adminUpdateUser) {
      return next(new HttpError("user not found", 404));
    }
    if (adminUpdateUser.role !== "customer") {
      return next(new HttpError("only customers can be updated", 400));
    }
    const updates = Object.keys(req.body);
    const allowedFields = ["name", "email"];

    const isvalid = updates.every((field) => allowedFields.includes(field));
    if (!isvalid) {
      return next(new HttpError("only allowed field can be updated", 500));
    }
    updates.forEach((update) => {
      adminUpdateUser[update] = req.body[update];
    });

    await adminUpdateUser.save();

    res.status(200).json({
      success: true,
      message: "package data updated successfully",
      adminUpdateUser,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

export default {
  register,
  login,
  getAllUser,
  authLogin,
  logout,
  userDelete,
  deleteUserByAdmin,
  updateUserByAdmin,
};
