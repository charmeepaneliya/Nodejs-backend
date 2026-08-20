import User from "../models/User.model.js";

import HttpError from "../middleware/HttpError.js";
import restaurantModel from "../models/restaurant.model.js";
import Provider from "../models/provider.model.js";
import Food from "../models/food.model.js";
import Order from "../models/order.model.js";

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

      res.status(200).json({
        success: true,
        message: "verified customer data found",
        customer,
      });
    }

    if (role === "admin") {
      const admin = await User.find({
        role: "admin",
        isVarified: true,
      });

      if (admin.length === 0) {
        return next(new HttpError("No verified admin found", 404));
      }

      res
        .status(200)
        .json({ success: true, message: "verified admin data found", admin });
    }

    if (role === "provider") {
      const provider = await Provider.find({
        role: "provider",
        isVarified: true,
      });
      if (provider.length === 0) {
        return next(new HttpError("No verified provider found", 404));
      }
      res.status(200).json({
        success: true,
        message: "verified provider data found",
        provider,
      });
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

const dashboardStatic = async (req, res, next) => {
  try {
    const totalUser = await User.countDocuments();

    const totalCustomer = await User.countDocuments({ role: "customer" });

    const restaurant = await restaurantModel.countDocuments();

    const provider = await Provider.countDocuments();

    const totalApprovedProvider = await User.countDocuments({
      role: "provider",
      isVerified: true,
    });

    const totalPendingProvider = await User.countDocuments({
      role: "provider",
      isVerified: false,
    });

    const totalRestaurant = await restaurantModel.countDocuments();

    const totalPendingRestaurant = await restaurantModel.countDocuments({
      isVerified: false,
    });

    const totalFoodItems = await Food.countDocuments();

    const totalApprovedFoodItems = await Food.countDocuments({
      isVerified: true,
    });

    const totalPendingFoodItems = await Food.countDocuments({
      isVerified: false,
    });

    const totalBookings = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const totalRevenue = await Order.aggregate([
      {
        $match: {
          status: "delivered",
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    // const orderStatus = await Order.aggregate([
    //   {
    //     $group: {
    //       _id: "$status",
    //       total: {
    //         $sum: 1,
    //       },
    //     },
    //   },
    // ]);

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully!",
      totalBookings,
      totalRevenue,
      totalPendingFoodItems,
      totalFoodItems,
      totalApprovedFoodItems,
      totalRestaurant,
      totalPendingRestaurant,
      totalApprovedProvider,
      totalPendingProvider,
    });
  } catch (error) {
    return next(new HttpError(error.message));
  }
};

export default { getAllVerifiedData, dashboardStatic };
