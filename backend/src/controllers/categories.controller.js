import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db.js'; // Adjust the path based on your project structure

// CREATE a new category
export const createCategory = async (req, res) => {
  try {
    const {
      category_name,
      description,
      image,
      icon,
      banner,
      sortorder,
      top_categories,
      top_stores,
      featured_products,
      top_brands,
      parent_id,
      status,
      store_id,
      cby,
    } = req.body;

    const id = uuidv4();

    const query = `
      INSERT INTO categories (
        id, category_name, description, image, icon, banner,
        sortorder, top_categories, top_stores, featured_products,
        top_brands, parent_id, status, store_id, cdate, cby
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10,
        $11, $12, $13, $14, NOW(), $15
      )
      RETURNING *;
    `;

    const values = [
      id, category_name, description, image, icon, banner,
      sortorder, top_categories, top_stores, featured_products,
      top_brands, parent_id, status, store_id, cby
    ];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ all categories
export const getAllCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY sortorder ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ one category
export const getCategoryById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE category
export const updateCategory = async (req, res) => {
  try {
    const {
      category_name,
      description,
      image,
      icon,
      banner,
      sortorder,
      top_categories,
      top_stores,
      featured_products,
      top_brands,
      parent_id,
      status,
      store_id,
      uby,
    } = req.body;

    const query = `
      UPDATE categories SET
        category_name = $1,
        description = $2,
        image = $3,
        icon = $4,
        banner = $5,
        sortorder = $6,
        top_categories = $7,
        top_stores = $8,
        featured_products = $9,
        top_brands = $10,
        parent_id = $11,
        status = $12,
        store_id = $13,
        udate = NOW(),
        uby = $14
      WHERE id = $15
      RETURNING *;
    `;

    const values = [
      category_name, description, image, icon, banner,
      sortorder, top_categories, top_stores, featured_products,
      top_brands, parent_id, status, store_id, uby, req.params.id
    ];

    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE category
export const deleteCategory = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
