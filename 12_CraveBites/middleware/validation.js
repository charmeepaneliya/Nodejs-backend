// import HttpError from "./HttpError.js";

// const validate = (Schema) => (req, res, next) => {
//   try {
//     const { error, value } = Schema.validate(req.body, {
//       abortEarly: false,
//       allowUnknown: false,
     
//     });
//     if (error) {
//       return next(new HttpError(error.details[0].message, 400));
//     }
//     next();
//     return value;
//   } catch (error) {
//     throw new Error(Error.message);
//   }
// };

// export default validate;

import HttpError from "./HttpError.js";

const validate = (Schema) => (req, res, next) => {
  try {

    const { error, value } = Schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });


    if (error) {
      return next(
        new HttpError(error.details[0].message, 400)
      );
    }


    req.body = value;

    next();

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


export default validate;
