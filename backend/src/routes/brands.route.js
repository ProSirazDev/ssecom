import express from "express";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";
import uploadToCloudinary from "../middlewares/cloudinary.middleware.js";

const router = express.Router();

router.get('/', getAllBrands);
router.get("/:id", getBrandById);
router.post("/", uploadToCloudinary, createBrand);
router.put("/:id", updateBrand);
router.delete("/:id", deleteBrand);

export default router;
