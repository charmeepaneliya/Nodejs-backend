import mongoose from "mongoose";

const packageShema = new mongoose.Schema({
  packageName: {
    type: String,
    required: true,
    trim: true,
  },
  startdDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  packageImages: {
    type: String,
    required: true,
  },
  packagePrice: {
    type: Number,
    default: 0,
  },
},
{
    timestamps:true,
});

const Package = mongoose.model("packages", packageShema);

export default Package;
