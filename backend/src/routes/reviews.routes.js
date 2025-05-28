import express from 'express';
import { createOrUpdateReview, deleteReview, getProductRatingSummary, getReviewsForProduct } from '../controllers/reviews.controller.js';



const router = express.Router();

router.post('/', createOrUpdateReview);                       // POST /reviews
router.get('/:productId/reviews', getReviewsForProduct);      // GET /reviews/:productId/reviews
router.get('/:productId/rating', getProductRatingSummary);    // GET /reviews/:productId/rating
router.delete('/', deleteReview);                             // DELETE /reviews


export default router;