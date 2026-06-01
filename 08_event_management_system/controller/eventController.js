import HttpError from "../middleware/HttpError.js";
import Event from "../model/Event.js";
import fs from "fs";

const create = async (req,res,next)=>{
    try {   
        console.log(req.body);
        const {eventName,eventDate,eventDescription,eventVenue,ticketPrice} = req.body;

        const eventImages = req.files?.eventImages?.map((file)=>file.path) || null;
        const eventPoster = req.files?.eventPoster?.[0]?.path || null;
        const eventBanners = req.files?.eventBanners?.[0]?.path || null;
        const eventSpeakers = req.files?.eventSpeakers?.map((file)=>file.path) || null;
        const eventDocument = req.files?.eventDocument?.map((file)=>file.path) || null;

        if(!eventDate){
            return next(new HttpError("event date is required",400));
        }

        const newEvent = new Event({
            eventName,
            eventDate,
            eventDescription,
            eventPoster,
            eventVenue,
            eventImages,
            eventBanners,
            eventSpeakers,
            ticketPrice,
            eventDocument,

        });

        await newEvent.save();

        res.status(201).json({success:true,message:"new event addded successfully",newEvent});
    } catch (error) {
        return next(new HttpError(error.message));
    }
};

const deleteEvent = async (req,res,next)=>{
    try {
        const {id} =  req.params;

        const eventDelete = await Event.findById(id);

        if(!eventDelete){
            return next(new HttpError("event not found with this id",404));
        }

        const filesDelete = [
            eventDelete.eventPoster,
            eventDelete.eventBanners,
            ...(eventDelete.eventImages || []),
            ...(eventDelete.eventSpeakers || []),
            ...(eventDelete.eventDocument || []),

        ].filter(Boolean);

        await Event.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"event data deleted successfully",});
    } catch (error) {
        return next(new HttpError(error.message,500));
    }
}
export default {create,deleteEvent};