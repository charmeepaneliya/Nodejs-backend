import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

const userSechma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          return "password can't contain password word as password";
        }
      },
    },
     tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ]
  },
  {
    timestamps: true,
  },
);

userSechma.pre("save", async function () {
  const user = this;

  console.log("before hash password:", user.Password);

  if (user.isModified("Password")) {
    user.Password = await bcrypt.hash(user.Password, 10);
    console.log("after hash pwd:", user.Password);
  }
  console.log("----- save completed -----");
});

userSechma.statics.findByCredential = async function (Email, Password) {
  try {
    console.log("----- login process -----");
    console.log("email entered:", Email);

    const user = await User.findOne({ Email });

    console.log("user found:", user);

    if (!user) {
      throw new Error("uneble to login");
    }

    const isMatched = await bcrypt.compare(Password, user.Password);

    console.log("password metched:", isMatched);

    if (!isMatched) {
      throw new Error("uneble to login");
    }

    console.log("----- login success -----");

    return user;
  } catch (error) {
    console.log("login error:", error.message);
    throw new Error(error.message);
  }
};

userSechma.methods.generateAuthToken = async function () {
  try {
    const user = this;

    // console.log("----- generate token -----");
    // console.log("user id:", user._id);

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    user.tokens = user.tokens.concat({ token });
    // console.log("Generated token:", token);
    // console.log("----- token created -----");
    await user.save();
    return token;
  } catch (error) {
    // console.log("token error:", error.message);
    throw new Error(error.message);
  }
};

userSechma.methods.toJSON = function () {
  const user = this;
  // console.log("user", user);
  const userObject = user.toObject();

  // console.log("userObject", userObject);

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.__v;
  return userObject;
};
const User = mongoose.model("User", userSechma);

export default User;
