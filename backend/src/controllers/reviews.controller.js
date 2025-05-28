import pool from "../config/db.js"; // Your PostgreSQL pool

/**
 * Create or update a review
 */
export const createOrUpdateReview = async (req, res) => {
  const { userId, productId, rating, comment } = req.body;

  if (!userId || !productId || !rating) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Check if user has purchased the product
    const purchaseCheck = await pool.query(
      `SELECT 1 FROM order_items oi
       JOIN orders o ON o.id = oi.order_id
       WHERE o.customer_id = $1::uuid AND oi.product_id = $2::uuid`,
      [userId, productId]
    );

    if (purchaseCheck.rowCount === 0) {
      return res.status(403).json({
        message: 'You must purchase the product to review it.',
      });
    }

    // 2. Create or update review
    const result = await pool.query(
      `INSERT INTO reviews (user_id, product_id, rating, comment)
       VALUES ($1::uuid, $2::uuid, $3, $4)
       ON CONFLICT (user_id, product_id)
       DO UPDATE SET rating = EXCLUDED.rating,
                     comment = EXCLUDED.comment,
                     created_at = CURRENT_TIMESTAMP
       RETURNING *;`,
      [userId, productId, rating, comment]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating/updating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Get all reviews for a specific product
 */
export const getReviewsForProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await pool.query(`
            SELECT r.*, u.id AS user_name
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.product_id = $1
            ORDER BY r.created_at DESC;
        `, [productId]);

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching product reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Get average rating and total reviews for a product
 */
 export const getProductRatingSummary = async (req, res) => {
    const { productId } = req.params;

    try {
        const result = await pool.query(`
            SELECT 
                AVG(rating)::numeric(2,1) AS average_rating,
                COUNT(*) AS total_reviews
            FROM reviews
            WHERE product_id = $1;
        `, [productId]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching product rating summary:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * Delete a review (if needed)
 */
 export const deleteReview = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        await pool.query(`
            DELETE FROM reviews
            WHERE user_id = $1 AND product_id = $2;
        `, [userId, productId]);

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


