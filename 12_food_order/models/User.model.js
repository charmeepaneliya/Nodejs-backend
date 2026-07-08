import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    role:{
        type:String,
        enum:["customer","admin","provider"],
        default:"customer",
    },
    isVarified:{
        type:Boolean,
        default:false,
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

userSchema.pre("save",async function(){
  const user = this;
  if(user.isModified("password")){
    user.password = await bcrypt.hash(user.password, 10);
    
  }

});

const User = mongoose.model("User",userSchema);

export default User;
