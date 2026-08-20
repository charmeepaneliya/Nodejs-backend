import Provider from "../models/provider.model.js";
import HttpError from "../middleware/HttpError.js";
import User from "../models/User.model.js";

const registerAsProvider = async (req, res, next) => {
  try {
    const user = await User.findById(userId);

    const existingProvider = await Provider.findById(userId);

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
    const id = req.params.id || req.user._id;

    const provider = await User.findById(id);

    if (!provider) {
      return next(new HttpError("Provider not found", 404));
    }
    
    const updates = Object.keys(req.body);
    const allowedFields = ["ownerName", "restaurants", "documents","cloudinary_id","bancAccNumber"];

    const isValidUpdates = updates.every((field) =>
      allowedFields.includes(field),
    );

    if (!isValidUpdates) {
      return next(new HttpError("only allowed field can be updated", 500));
    }

    updates.forEach((update) => {
      provider[update] = req.body[update];
    });

    await provider.save();

    res.status(200).json({
      success: true,
      message: "provider data updated successfully",
      provider,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { registerAsProvider,getAllProviders,updateProvider };
