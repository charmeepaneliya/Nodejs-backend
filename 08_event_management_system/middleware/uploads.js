import multer from "multer";

import fs from "fs";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let folderName = "uploads/";

        if(file.fieldname === "eventImages"){
            folderName += "eventImages";
        }else if(file.fieldname === "eventPoster"){
            folderName += "eventPoster";
        }else if(file.fieldname === "eventBanners"){
            folderName += "eventBanners";
        }else if(file.fieldname === "eventSpeakers"){
            folderName += "eventSpeakers";
        }else if(file.fieldname === "eventDocument"){
            folderName += "eventDocument";
        }else{
            folderName = "others";
        }
        fs.mkdirSync(folderName, {recursive:true});
        
        return cb(null,folderName);
    },

    filename: (req,file,cb) =>{
        const uniqueName = `${file.fieldname}-${Date.now()}-${file.originalname}`;

        return cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) =>{
    const imagesType = ["image/jpg","image/jpeg","image/png"];

    const documentType = ["application/pdf"];

    if(file.fieldname === "eventDocument"){
        if(documentType.includes(file.mimetype)){
            return cb(null,true);
        }else{
            cb(new Error("only pdf format is allowed"));
        }
    }else{
        if(imagesType.includes(file.mimetype)){
            return cb(null,true);
        }else{
            cb(new Error("only jpg,jpeg, or png format is allowed"));
        }
    }
};

const uploads = multer({
    storage,fileFilter,limits:{fileSize: 50 * 1024 * 1024},
});

export default uploads;