import User from "../models/User.js";
import HttpError from "../middleware/HttpError.js";


const add = async (req, res, next) => {
  try {
    console.log("Request Body:",req.body);

    const { name, Email, Password } = req.body;

    const newUser = new User({
      name,
      Email,
      Password,
    });

    console.log("User object before save:", newUser);

    await newUser.save();

    console.log("user saved successfully",newUser);

    res.status(201).json({
      success: true,
      message: "user added successfully!",
      data: newUser,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
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

const login = async (req, res, next) => {
  try {
    // console.log("Logoin Request Body:",req.body);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    const { Email, Password } = req.body;

    const user = await User.findByCredential(Email, Password);

    // console.log("user found",user);

    if (!user) {
      next(new HttpError("unable to login", 400));
    }

    const token = await user.generateAuthToken();
    

    // console.log("generater token:",token);

    res.status(200).json({
      success: true,
      message: "user logged in successfully!",
      user,
      token,
    });
  } catch (error) {

    // console.log("login Error:",error.message);

    return next(new HttpError(error.message, 500));
  }
};

const authLogin = async (req, res, next) => {
  const user = req.user;

  res.status(200).json({success:true,message:"auth login successfully!",user});
};

const deleteUser = async (req,res,next)=>{
  try {
    const user = req.user;
    await User.deleteOne(user);
   res.status(200).json({success:true,message:"user deleted successfully!"});
  } catch (error) {
    
  }
}

const logOut  = async (req, res, next) => {
  // try {
  //   const user = req.user;
  //   const token = req.token;

  //   console.log("Current User:",user.name);
  //   console.log("Current Tolken:",token);

  //   user.tokens = user.tokens.filter((t) => t.token !== token);

  //   console.log("Remaining tokens:",user.tokens);

  //   await user.save();

  //   res
  //     .status(200)
  //     .json({ success: true, message: "user deleted successfully!" });
  // } catch (error) {
  //   console.log("logout error:",error.message);
  //   return next(new HttpError(error.message, 500));
  // }
  try {
    req.user.tokens = req.user.tokens.filter((t)=>t.token != req.token);

    await req.user.save();

    res.status(200).json({success:true,message:"user log out successfully"});
  } catch (error) {
    return next (new HttpError(error.message,500));
  }
};

const logOutAll = async (req, res, next) => { 
  try {
    const user = req.user;

    console.log("Before:",user.tokens);

    user.tokens = [];

    await user.save();

    console.log("After:",user.tokens);

    res.status(200).json({
      success: true,
      message: "user deleted from all devices successfully!",
    });
  } catch (error) {

    console.log("Logout all error:",error.message);

    return next(new HttpError(error.message, 500));
  }
};

const userUpdate = async (req, res, next) => {
  try {
    const user = req.user;

    console.log("request body:",req.body);

    const updates = Object.keys(req.body);

    console.log("fields to update:",updates);

    const allowedFields = ["name", "Password"];

    const isValidUpdates = updates.every((feild) =>
      allowedFields.includes(feild),
    );

    console.log("is valid update:",isValidUpdates);

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    console.log("Upadated user:",user);

    res.status(200).json({
      success: true,
      message: "user updated successfully!",
    });
  } catch (error) {
    console.log("update error:",error.message);
    return next(new HttpError(error.message, 500));
  }
};

export default {
  add,
  getAllUsers,
  login,
  authLogin,
  logOut,
  logOutAll,
  userUpdate,
};
