import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller.js';
import uploadToCloudinary from '../middlewares/cloudinary.middleware.js';

const router = express.Router();


router.get('/', getAllProducts);
router.get("/:id", getProductById);
router.post("/", uploadToCloudinary, createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct)

export default router;
