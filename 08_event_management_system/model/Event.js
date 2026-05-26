import mongoose from "mongoose";
import { type } from "node:os";

const eventSchema = new mongoose.Schema({

    eventName:{
        type: String,
        required: true,
        trim:true
    },
    theme:{
        type: String,
        required: true,
        trim:true
    },
    eventDay:{
        type:Date,
        required: true
    },
    contact:{
        type: String,
        required: true,
        trim:true,
        minlength: 10
    },
    venue:{
        type: String,
        required:true,
        trim:true
    },

});

const Event = mongoose.model("eventData",eventSchema);

export default Event;
