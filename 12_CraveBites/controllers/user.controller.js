import cloudinary from "../config/cloudinary.js";
import HttpError from "../middleware/HttpError.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

import sendMail from "../utils/sendEmail.js";
import emailTemplate from "../template/emailTemplate.js";
import loginEmailTemplate from "../template/UserloginEmailTemplate.js";
import auditLogger from "../middleware/auditLogger.js";

const add = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, isVarified, address } =
      req.body;
    const newUser = {
      name,
      email,
      password,
      role,
      phone,
      isVarified,
      address,
      profilePic: req.file ? req.file.path : null,
      cloudinary_id: req.file ? req.file.filename : null,
    };
    const user = new User(newUser);
    await user.save();

    await sendMail(email, "welcome to CraveBites", emailTemplate(name));

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

    await sendMail(
      user.email,
      "New Login Detected - CraveBites 🔐",
      loginEmailTemplate(user.name),
    );

    res.status(200).json({ success: true, user, token });

    await auditLogger({
      action: "USER_LOGIN",
      performedBy: user._id,
      module: "user",
      targetedId: user._id,
      Ip: req.ip,
      userAgent: req.get("user-agent"),
    });
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
      total: users.length,
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

const logOut = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "user log out successfully!" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const logOutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "user log out from all device" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const targetUser = req.params.id || req.user_id;

    const user = await User.findById(targetUser);

    if (!targetUser) {
      return next(new HttpError("user not found", 404));
    }

    const updates = Object.keys(req.body);
    const allowedFields = ["name", "address", "phone", "password"];

    if (req.user.role === "admin") {
      allowedFields = [...allowedFields, "isVerified"];
    }

    console.log("allowed Fields", allowedFields);

    const isValid = updates.every((field) => allowedFields.includes(field));

    if (!isValid) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    if (req.file) {
      if (user.cloudinary_id) {
        await cloudinary.uploader.destroy(user.cloudinary_id);
      }
      user.profilePic = req.file.path;
      user.cloudinary_id = req.file.filename;
    }
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "user data updated successfully!",
      user,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
// const updateUser = async (req, res, next) => {
//   try {
//     const user = req.user;

//     const updates = Object.keys(req.body);

//     const allowedFields = ["name", "address", "phone"];

//     const isValid = updates.every((field) => allowedFields.includes(field));

//     if (!isValid) {
//       return next(new HttpError("only allowed field can be updated", 400));
//     }

//     updates.forEach((update) => {
//       user[update] = req.body[update];
//     });
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "user data updated successfully!",
//       user,
//     });
//   } catch (error) {
//     return next(new HttpError(error.message, 500));
//   }
// };

// const updateUserByAdmin = async (req, res, next) => {
//   try {
//     const id = req.params.id || req.user.id;

//     const admiUpdateUser = await User.findById(id);

//     if (!admiUpdateUser) {
//       return next(new HttpError("user not found", 404));
//     }
//     if (!admiUpdateUser.role !== "customer") {
//       return next(new HttpError("only customers can be updated", 400));
//     }
//     const updates = Object.keys(req.body);
//     const allowedFields = ["name", "phone", "address"];

//     const isValidUpdates = updates.every((field) =>
//       allowedFields.includes(field),
//     );

//     if (!isValidUpdates) {
//       return next(new HttpError("only allowed field can be updated", 500));
//     }

//     updates.forEach((update) => {
//       TravelPackage[update] = req.body[update];
//     });

//     await admiUpdateUser.save();

//     res.status(200).json({
//       success: true,
//       message: "package data updated successfully",
//       admiUpdateUser,
//     });
//   } catch (error) {
//     next(new HttpError(error.message, 500));
//   }
// };

// const deleteUser = async (req, res, next) => {
//   try {
//     const user = req.user;
//     await user.deleteOne();

//     res
//       .status(200)
//       .json({ success: true, message: "user deleted successfully!" });
//   } catch (error) {
//     next(new HttpError(error.message, 500));
//   }
// };

// const deleteUserByDelete = async (req, res, next) => {
//   try {
//     const id = req.params.id || req.user.id;

//     const user = await User.findById(id);

//     if (!user) {
//       return next(new HttpError("user not found", 404));
//     }
//     await User.findByIdAndDelete(id);

//     res
//       .status(200)
//       .json({ success: true, message: "customer deleted successfully" });
//   } catch (error) {
//     next(new HttpError(error.message, 500));
//   }
// };

const deleteUser = async (req, res, next) => {
  try {
    const targetedUser = req.params.id || req.user._id;

    const user = await User.findById(targetedUser);

    if (!user) {
      return next(new HttpError("user not found", 404));
    }
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== user._id.toString()
    ) {
      return next(new HttpError("access denied", 403));
    }

    await user.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
export default {
  add,
  login,
  getAllUsers,
  authLogin,
  logOut,
  logOutAll,
  updateUser,
  deleteUser,
};
