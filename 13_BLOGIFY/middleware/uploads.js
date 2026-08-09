import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder_name: "Blogify",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({
  storage,
  limlits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;