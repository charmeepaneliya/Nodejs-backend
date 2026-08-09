import cloudinary from "../config/cloudinary.js";
import HttpError from "../middleware/HttpError.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const add = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, address, isVarified } =
      req.body;

    const newUser = {
      name,
      email,
      password,
      role,
      phone,
      address,
      isVarified,
      profilePic: req.file ? req.file.path : null,
      cloudinary_id: req.file ? req.file.filename : null,
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

    const user = await User.findByCredentials(email, password);
    if (!user) {
      return next(new HttpError("unable to login"));
    }
    const isMetch = await bcrypt.compare(password, user.password);
    if (!isMetch) {
      return next(new HttpError("unable to login"));
    }

    const token = await user.generateAuthToken();

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();

    if (user.length === 0) {
      return next(new HttpError("no user data found", 404));
    }
    res.status(200).json({
      success: true,
      message: "all user data fetched successfully!",
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
      return next(new HttpError("no user data found", 404));
    }
    res
      .status(200)
      .json({ success: true, message: "user logged in successfully!", user });
  } catch (error) {
    return next(new HttpError(error.message), 500);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = req.user;

    const updates = Object.keys(req.body);

    const allowedFields = ["name", "phone", "address"];

    const isValid = updates.every((field) => allowedFields.includes(field));

    if (!isValid) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    if (req.file) {
      if (user.cloudinary_id) {
        await cloudinary.uploader.destroy(user.cloudinary_id);
      }

      user.profilePic = req.file.path;
      user.cloudinary_id = req.file.filename;
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "your account updated successfully!",
      user,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.cloudinary_id) {
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "your account deleted successfully!",
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateUserByAdmin = async (req, res, next) => {
  try {
    const id = req.params.id || req.user._id;

    const adminUpdateUser = await User.findById(id);

    if (!adminUpdateUser) {
      return next(new HttpError("user not found", 404));
    }
    
    const updates = Object.keys(req.body);
    const allowedFields = ["name", "phone", "address"];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
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
    next(new HttpError(error.message, 500));
  }
};

const deleteUserByAdmin = async(req,res,next)=>{
  try {
    const id = req.params.id || req.user._id;

    const user = await User.findById(id);

    if(!user){
      return next(new HttpError("user not found",404));
    }

    if(user.cloudinary_id){
      await cloudinary.uploader.destroy(user.cloudinary_id);
    }
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "user data deleted successfully",
      
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
}

export default { add, login, getAllUsers, authLogin, updateUser , deleteUser , updateUserByAdmin, deleteUserByAdmin};
