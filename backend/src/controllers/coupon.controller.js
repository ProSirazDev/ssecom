import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// GET all coupons
export const getAllCoupons = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        coupon_code, 
        discount_type, 
        discount_value, 
        max_discount, 
        minimum_order_value, 
        is_active, 
        TO_CHAR(valid_from, 'DD-MM-YYYY') AS valid_from,
        TO_CHAR(valid_to, 'DD-MM-YYYY') AS valid_to,
        TO_CHAR(created_at, 'DD-MM-YYYY') AS created_date
      FROM coupon
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM coupon WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const {
      coupon_code,
      discount_type,
      discount_value,
      minimum_order_value = 0,
      max_discount,
      valid_from,
      valid_to,
      usage_limit = 1,
      is_active = true,
      cby
    } = req.body;

    const id = uuidv4();
    const created_at = new Date();

    await pool.query(
      `INSERT INTO coupon (
        id, coupon_code, discount_type, discount_value,
        minimum_order_value, max_discount, valid_from, valid_to,
        usage_limit, used_count, is_active,
        created_at, updated_at, cby, uby
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, 0, $10,
        $11, $11, $12, $12
      )`,
      [
        id, coupon_code, discount_type, discount_value,
        minimum_order_value, max_discount, valid_from, valid_to,
        usage_limit, is_active,
        created_at, cby
      ]
    );

    res.status(201).json({ message: "Coupon created", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT: Update coupon
export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      coupon_code,
      discount_type,
      discount_value,
      minimum_order_value,
      max_discount,
      valid_from,
      valid_to,
      usage_limit,
      is_active,
      uby
    } = req.body;

    const updated_at = new Date();

    const result = await pool.query(
      `UPDATE coupon SET
        coupon_code = $1,
        discount_type = $2,
        discount_value = $3,
        minimum_order_value = $4,
        max_discount = $5,
        valid_from = $6,
        valid_to = $7,
        usage_limit = $8,
        is_active = $9,
        uby = $10,
        updated_at = $11
       WHERE id = $12`,
      [
        coupon_code,
        discount_type,
        discount_value,
        minimum_order_value,
        max_discount,
        valid_from,
        valid_to,
        usage_limit,
        is_active,
        uby,
        updated_at,
        id
      ]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json({ message: "Coupon updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE coupon
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM coupon WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.json({ message: "Coupon deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
