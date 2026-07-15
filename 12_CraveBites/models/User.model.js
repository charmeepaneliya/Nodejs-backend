import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          return "password can't contain password words as password";
        }
      },
    },
    role: {
      type: String,
      enum: ["customer", "admin", "provider"],
      default: "customer",
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});
userSchema.statics.findByCredential = async function (email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("unable to login");
    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      throw new Error("unable to login");
    }
    return user;
  } catch (error) {
    throw new Error("error.message");
  }
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  user.tokens.push({ token });

  await user.save();

  return token;
};

const User = mongoose.model("User", userSchema);

export default User;
