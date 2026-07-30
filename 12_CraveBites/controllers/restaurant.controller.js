import restaurantModel from "../models/restaurant.model.js";

import HttpError from "../middleware/HttpError.js";

const add = async (req, res, next) => {
  try {
    const {
      restaurantName,
      description,
      address,
      city,
      state,
      phone,
      openingTime,
      closingTime,
      isOpen,
    } = req.body;
    const newRestaurant = await restaurantModel.create({
      restaurantName,
      description,
      address,
      city,
      state,
      phone,
      openingTime,
      closingTime,
      isOpen,
      restaurantImage: req.file?.path || null,
      cloudinary_Id: req.file?.filename || null,
      owner: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "restaurant added successfully!",
      newRestaurant,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllRestaurant = async(req,res,next)=>{
  try {
    const {page=1,limlit=10,isOpen,search,sort="createdAt",order="desc"}=req.query;

    page=Number(page);
    limit=Number(limit);

    const filter = {};

    if(search){
      filter.restaurantName={
        $regex:search,
        $options:"i"
      };
    }
    if(isOpen!==undefined){
      filter.isOpen=isOpen==="true";
    }
    // const sortoption =() =>{
    //   [sort]="asc"?1:-1;
    // }

    const totalRestaurant = await restaurantModel.countDocuments(filter)
    const restaurant = await restaurantModel.find(filter).populate("owner","name email address -_id").sort(sortoption).skip((page-1)*limit).lean();

    if(restaurant.length === 0){
      res.status(404).json({success:true,message:"restaurant note found"});
    }
    res.status(200).json({success:true,message:"restaurant founds",totalRestaurant:totalRestaurant,page:page,restaurant});
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
}

export default { add, getAllRestaurant };
