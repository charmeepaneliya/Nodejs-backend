import Provider from "../models/provider.model.js";
import HttpError from "../middleware/HttpError.js";
import User from "../models/User.model.js";

const registerAsProvider = async (req, res, next) => {
  try {

    const userId = req.user._id;

    const user = await User.findById(userId);

    if(!user){
      return next(new HttpError("User not found",404));
    }

    const existingProvider = await Provider.find({
      ownerName:userId,
    });

    if (!existingProvider) {
      return next(new HttpError("already register as provider", 400));
    }
    const { restaurant, bancAccNumber } = req.body;

    const newProvider = await Provider.create({
      restaurant,
      bancAccNumber,
      documents: req.file.map((file) => FileReader.path),
      cloudinary_id: req.file.map((file) => file.filename),
    });
    user.role = "provider";

    await user.save();

    res
      .status(201)
      .json({ success: true, message: "provider register", newProvider });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAllProviders = async (req, res, next) => {
  try {
    const providers = await Provider.find()
      .populate("ownerName")
      .populate("restaurants");

    if (providers.length === 0) {
      return next(new HttpError("No provider data found", 404));
    }

    res
      .status(201)
      .json({
        success: true,
        message: "All provider data fetched successfully!",
        total: providers.length,
        providers,
      });
  } catch (error) {
    return next (new HttpError(error.message,500));
  }
};

const updateProvider = async (req, res, next) => {
  try {
    const targetProvider = req.params.id || req.user_id;

    const provider = await User.findById(targetUser);

    if (!provider) {
      return next(new HttpError("user not found", 404));
    }

    const updates = Object.keys(req.body);
    const allowedFields = ["ownerName", "restaurants", "documents","cloudinary_id","bancAccNumber"];

    if (req.user.role === "admin") {
      allowedFields = [...allowedFields, "isVerified"];
    }

    console.log("allowed Fields", allowedFields);

    const isValid = updates.every((field) => allowedFields.includes(field));

    if (!isValid) {
      return next(new HttpError("only allowed field can be updated", 400));
    }

    if (req.file) {
      if (provider.cloudinary_id) {
        await cloudinary.uploader.destroy(provider.cloudinary_id);
      }
      provider.profilePic = req.file.path;
      provider.cloudinary_id = req.file.filename;
    }
    updates.forEach((update) => {
      provider[update] = req.body[update];
    });

    await provider.save();

    res.status(200).json({
      success: true,
      message: "user data updated successfully!",
      provider,
    });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};
// const updateProvider = async (req, res, next) => {
//   try {
//     const provider = req.provider;

//     const updates = Object.keys(req.body);

//     const allowedFields = ["ownerName", "restaurants", "documents","cloudinary_id","bancAccNumber"];

//     const isValid = updates.every((field) => allowedFields.includes(field));

//     if (!isValid) {
//       return next(new HttpError("only allowed field can be updated", 400));
//     }

//     updates.forEach((update) => {
//       provider[update] = req.body[update];
//     });
//     await provider.save();

//     res.status(200).json({
//       success: true,
//       message: "provider data updated successfully!",
//       provider,
//     });
//   } catch (error) {
//     return next(new HttpError(error.message, 500));
//   }
// };


// const updateProviderByAdmin = async (req, res, next) => {
//   try {
//     const id = req.params.id || req.user._id;

//     const provider = await User.findById(id);

//     if (!provider) {
//       return next(new HttpError("Provider not found", 404));
//     }
    
//     const updates = Object.keys(req.body);
//     const allowedFields = ["ownerName", "restaurants", "documents","cloudinary_id","bancAccNumber"];

//     const isValidUpdates = updates.every((field) =>
//       allowedFields.includes(field),
//     );

//     if (!isValidUpdates) {
//       return next(new HttpError("only allowed field can be updated", 500));
//     }

//     updates.forEach((update) => {
//       provider[update] = req.body[update];
//     });

//     await provider.save();

//     res.status(200).json({
//       success: true,
//       message: "provider data updated successfully",
//       provider,
//     });
//   } catch (error) {
//     next(new HttpError(error.message, 500));
//   }
// };

const deleteProvider = async (req, res, next) => {
  try {
    const targetedProvider = req.params.id || req.provider._id;

    const provider = await Provider.findById(targetedProvider);

    if (!provider) {
      return next(new HttpError("provider not found", 404));
    }
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== provider.ownerName.toString()
    ) {
      return next(new HttpError("access denied", 403));
    }

    await provider.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "provider deleted successfully" });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};



export default { registerAsProvider,getAllProviders,updateProvider,deleteProvider};
