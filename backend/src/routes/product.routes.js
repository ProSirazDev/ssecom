import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getBestSellingProducts, getProductById, updateProduct } from '../controllers/product.controller.js';
import uploadToCloudinary from '../middlewares/cloudinary.middleware.js';

const router = express.Router();


router.get('/', getAllProducts);
router.get("/bestselling", getBestSellingProducts)
router.get("/:id", getProductById);
router.post("/", uploadToCloudinary, createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct)


export default router;
