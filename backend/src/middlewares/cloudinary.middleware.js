// In your multer middleware
import upload from "../config/cloudinary.js";
const uploadToCloudinary = (req, res, next) => {
  console.log("Multer Middleware called"); // Add log to confirm Multer is working

  upload.single("file")(req, res, (err) => {
    console.log(" uploaded successfully");

    if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ message: "Error uploading file" });
    }

    if (req.file) {
      console.log("Image uploaded to Cloudinary:", req.file.path); // Log image URL
      req.fileUrl = req.file.path; // Store the file URL in request object
    } else {
      console.log("No file uploaded");
    }

    next(); // Proceed to next middleware
  });
};

export default uploadToCloudinary;
