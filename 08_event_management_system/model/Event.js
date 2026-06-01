import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({

    eventName:{
        type: String,
        required: true,
        trim:true
    },
   
    eventDate:{
        type:Date,
        required: true
    },
    eventDescription: {
        type: String,
        required:true,
        trim: true,
    },
    eventPoster:{
        type:String,
        required:true,
    },
    
    eventVenue:{
        type: String,
        required:true,
        trim:true
    },
    eventImages:{
        type: [String],
    },
    eventBanners:String ,
       
    eventSpeakers:{
        type:[String],
    },
    
    ticketPrice:{
        type: Number,
        default: 0,
   },
   eventDocument:{
    type:[String],
    required:true,
   },
   
    
},
{
    timestamps:true,
},
);

const Event = mongoose.model("eventData",eventSchema);

export default Event;
