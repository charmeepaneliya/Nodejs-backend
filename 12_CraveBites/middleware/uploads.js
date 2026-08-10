import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "CraveBites",
//     allowed_formats: ["jpeg", "jpg", "png", "webp"],
//     // transformation: [
//     //   { height: "800", width: "800", crop: "limit" },
//     // { fetch_format: "webp" },
//     //   { quality: "auto" },
//     // ],
//   },
// });

// const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
// export default upload;

const createUploads = ({
  folder,
  transformation = [],
  resource_type = "auto",
  fileSize = 1024 * 1024 * 5,
  allowedFormats = [],
  mimetype = [],
}) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      return {
        folder,
        transformation,
        allowedFormats,
        resource_type,
      };
    },
  });
  return multer({
    storage,
    limits: { fileSize },
    fileFilter: (req, file, cb) => {
      if (mimetype.length && !mimetype.includes(file.mimetype)) {
        return cb(
          new Error(`invalid file type, Allowed types: ${mimetype.join(", ")}`),
          false,
        );
      } else {
        cb(null, true);
      }
    },
  });
};

export const profilePic = createUploads({
  folder: "craveBites/profilePic",
  transformation: [
    { height: "800", width: "800", crop: "limit" },
    { fetch_format: "webp" },
    { quality: "auto" },
  ],
  allowedFormats: ["jpg", "jpeg", "png", "webp"],
  mimetype: ["image/jpeg", "image/png", "image/jpg"],
});

export const restaurantImage = createUploads({
  folder: "craveBites/restaurantImage",

  transformation: [
    {
      height: 800,
      width: 800,
      crop: "limit",
    },
    {
      fetch_format: "webp",
    },
    {
      quality: "auto",
    },
  ],

  allowedFormats: ["jpg", "jpeg", "png", "webp"],

  mimeType: ["image/jpeg", "image/png", "image/jpg"],
});

export const documents = createUploads({
  folder: "craveBites/documents",
  allowedFormats: ["pdf"],
  mimetype: ["application/pdf"],
});

export default createUploads;
