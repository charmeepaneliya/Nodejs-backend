import HttpError from "../middleware/HttpError.js";
import Event from "../model/Event.js";

const create = async (req,res,next)=>{
    try {
        console.log(req.body);
        const {eventName,eventDate,eventDescription,Eventvenue,ticketPrice} = req.body;

        const eventImage = req.files?.eventImage?.map((file)=>file.path) || null;
        const eventPoster = req.files?.eventPoster[0]?.path || null;
        const eventBanners = req.files?.eventBanners[0]?.path || null;
        const eventSpeakers = req.files?.eventSpeakers?.map((file)=>file.path) || null;
        const eventDocument = req.files?.eventDocument?.map((file)=>file.path) || null;

        if(!eventDate){
            return next(new HttpError("event date is required",400));
        }

        const newEvent = await new Event({
            eventName,
            eventDate,
            eventDescription,
            eventPoster,
            Eventvenue,
            eventImage,
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
}
export default {create};