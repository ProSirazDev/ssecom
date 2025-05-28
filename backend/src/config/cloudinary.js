import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileType = file.mimetype.split("/")[1]; // Extract file extension

    return {
      folder: "school",
      allowed_formats: ["jpg", "png", "jpeg", "pdf"], // ✅ Now allows PDFs
      public_id: `${Date.now()}-${file.originalname}`, // Unique filename
      resource_type: "auto" // ✅ PDFs need "raw"
    };
  },
});


const upload = multer({ storage: storage });

export default upload;
