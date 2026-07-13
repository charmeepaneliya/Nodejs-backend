import HttpError from "./HttpError.js";

const validate = (Schema) => (req, res, next) => {
  try {
    const { error, value } = Schema.valid(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });
    if (error) {
      return next(new HttpError(error.details[0].messaeg, 400));
    }
    next();
    return value;
  } catch (error) {
    throw new Error(Error.message);
  }
};

export default validate;
