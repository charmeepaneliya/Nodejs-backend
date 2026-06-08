    import multer from "multer";
    import {CloudinaryStorage} from "multer-storage-cloudinary";
    import cloudinary from "../config/cloudinary.js";

    const storage = new CloudinaryStorage({
        cloudinary,
        params:{
            folder:"destinova",
            allowed_formate:["jpg","jpeg","png","webp"],
            Transformation:[
                {
                    height:500,
                    width:500,
                    crop:"limit",
                },
                {
                    fetch_formate:"webp",
                },
                {
                    quality:"auto",
                },
            ],
        },
    });

    const upload = multer({ storage, limits: 5 * 1024 * 1024});
    export default upload;
