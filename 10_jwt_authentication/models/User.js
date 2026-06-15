import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  },
  {
    timestamps: true,
  },
);

userSechma.pre("save", async function () {
  
  const user = this;

  if (user.isModified("Password")) {
    user.Password = await bcrypt.hash(user.Password, 10);
  }
});

userSechma.statics.findByCredential = async function (Email, Password) {
  try {
    const user = await this.findOne({ Email });

    if (!user) {
      throw new Error("uneble to login");
    }

    const isMatched = await bcrypt.compare(Password, user.Password);

    if (!isMatched) {
      throw new Error("uneble to login");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
const User = mongoose.model("user", userSechma);

export default User;
