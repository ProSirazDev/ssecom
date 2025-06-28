import pool from "../config/db.js";
export const getSalesAnalytics = async (req, res) => {
  try {
    const query = `
      SELECT
        (SELECT COUNT(*) FROM orders) AS total_orders,
        (SELECT COUNT(*) FROM customers) AS total_customers,
        (SELECT COALESCE(SUM(quantity), 0) FROM order_items) AS total_products_sold,
        (SELECT COALESCE(SUM(total_amount), 0) FROM orders) AS total_revenue;
    `;

    const result = await pool.query(query);
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error fetching sales analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales analytics',
      error: error.message,
    });
  }
};


