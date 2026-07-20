import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
    
});
console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.API_KEY);
console.log(
  "Secret:",
  process.env.API_SECRET ? "Available" : "Missing"
);




export default cloudinary;
