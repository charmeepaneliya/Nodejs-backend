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
  packageImage: {
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

const Pakesge = mongoose.model("packages", packageShema);

export default Pakesge;
