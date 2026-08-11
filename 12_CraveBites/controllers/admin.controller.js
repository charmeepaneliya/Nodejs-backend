import User from "../models/User.model.js";

import HttpError from "../middleware/HttpError.js";
import restaurantModel from "../models/restaurant.model.js";
import Provider from "../models/provider.model.js";

const getAllVerifiedData = async (req, res, next) => {
  try {
    const { role } = req.query;

    if (role === "customer") {
      const customer = await User.find({
        role: req.query.role,
        isVarified: true,
      });

      if (customer.length === 0) {
        return next(new HttpError("No verified customer found", 404));
      }

      res
        .status(200)
        .json({ success: true, message: "verified customer data found",customer });
    }

    if (role === "admin") {
      const admin = await User.find({
        role:"admin",
        isVarified: true,
      });

      if (admin.length === 0) {
        return next(new HttpError("No verified admin found", 404));
      }

      res
        .status(200)
        .json({ success: true, message: "verified admin data found",admin });
    }

    if (role === "provider") {
      const provider = await Provider.find({
        role:"provider",
        isVarified: true,
      });
      if (provider.length === 0) {
        return next(new HttpError("No verified provider found", 404));
      }
      res
        .status(200)
        .json({ success: true, message: "verified provider data found",provider});
    }
    return next(new HttpError("Invalid role", 400));
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

// const getAllVerifiedData = async (req, res, next) => {
//   try {
//     const { role } = req.query;

//     let data;

//     if (role === "customer") {
//       data = await User.find({
//         role: req.query.role,
//         isVarified: true,
//       });

//       if (data.length === 0) {
//         return next(
//           new HttpError("No verified customer found", 404)
//         );
//       }
//     }

//     if (role === "restaurant") {
//       data = await restaurantModel.find({
//         isVarified: true,
//       });

//       if (data.length === 0) {
//         return next(
//           new HttpError("No verified restaurant found", 404)
//         );
//       }
//     }

//     if (role === "provider") {
//       data = await Provider.find({
//         isVarified: true,
//       });

//       if (data.length === 0) {
//         return next(
//           new HttpError("No verified provider found", 404)
//         );
//       }
//     }

//     if (!data) {
//       return next(new HttpError("Invalid role", 400));
//     }

//     res.status(200).json({
//       success: true,
//       message: "Verified data found",
//       data,
//     });

//   } catch (error) {
//     return next(new HttpError(error.message, 500));
//   }
// };

export default { getAllVerifiedData };
