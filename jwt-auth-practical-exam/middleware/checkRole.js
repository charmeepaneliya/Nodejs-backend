import HttpError from "./HttpError.js";

const checkRole = (...roles) =>
  async function (req, res, next) {
    try {
      if (!req.user) {
        return next(new HttpError("please authentication to continue", 404));
      }
      if (!roles.includes(req.user.role)) {
        return next(
          new HttpError("forbidden access only admin can be changes", 403),
        );
      }
      next();
    } catch (error) {
      return next(new HttpError(error.message, 500));
    }
  };
export default checkRole;
