import pool from "../config/db.js"; // Your PostgreSQL pool
import { v4 as uuidv4 } from "uuid";

// GET all brands
export const getAllBrands = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM brands ORDER BY cdate DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET brand by ID
export const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM brands WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST: Create a new brand
export const createBrand = async (req, res) => {
  try {
    const { brand_name, description,  cby } = req.body;
      const image = req.fileUrl 
    const id = uuidv4();
    const cdate = new Date();

    await pool.query(
      `INSERT INTO brands (id, brand_name, description, image, cby, uby, cdate, udate)
       VALUES ($1, $2, $3, $4, $5, $5, $6, $6)`,
      [id, brand_name, description, image, cby, cdate]
    );

    res.status(201).json({ message: "Brand created", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT: Update a brand
export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand_name, description, image, uby } = req.body;
    const udate = new Date();

    const result = await pool.query(
      `UPDATE brands SET brand_name = $1, description = $2, image = $3, uby = $4, udate = $5
       WHERE id = $6`,
      [brand_name, description, image, uby, udate, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a brand
export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM brands WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.json({ message: "Brand deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
