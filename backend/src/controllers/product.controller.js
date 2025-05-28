import pool from "../config/db.js"; // Your PostgreSQL pool
import { v4 as uuidv4 } from "uuid";

// Helper to safely parse booleans
const parseBoolean = (val) => {
  if (Array.isArray(val)) return val.includes('true') || val.includes(true);
  return val === 'true' || val === true;
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const id = uuidv4();

    const {
      product_name,
      description,
      model,
      brand_id,
      category_id,
      sku,
      barcode,
      ean,
      price,
      tag,
      store_id,
      date_available,
      sort_order,
      quantity,
      stock_status_id,
      subtract,
      maxquantity,
      minimum,
      returnabledays,
      tax_class_id,
      reward_points,
      length,
      width,
      height,
      weight,
      length_class_id,
      weight_class_id,
      height_class_id,
      shipping,
      shipping_charge,
      status,
      location,
      option,
      attribute,
      discount,
      related_product,
      image,
      long_description,
      cby,
    } = req.body;

    const unit_image = req.fileUrl;

    // Sanitize boolean fields
    const subtractBool = parseBoolean(subtract);
    const shippingBool = parseBoolean(shipping);
   const statusValue = parseBoolean(status) ? 'active' : 'inactive';

    const query = `
      INSERT INTO products (
        id, product_name, description, model, brand_id, category_id,
        sku, barcode, ean, price, tag, store_id, date_available, sort_order,
        quantity, stock_status_id, subtract, maxquantity, minimum, returnabledays,
        tax_class_id, reward_points, length, width, height, weight,
        length_class_id, weight_class_id, height_class_id,
        shipping, shipping_charge, status, location,
        option, attribute, discount, related_product, image,long_description, unit_image,
        cby
      )
      VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12, $13, $14,
        $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26,
        $27, $28, $29,
        $30, $31, $32, $33,
        $34, $35, $36, $37, $38,
        $39, $40,$41
      )
    `;

    await pool.query(query, [
      id, product_name, description, model, brand_id, category_id,
      sku, barcode, ean, price, tag, store_id, date_available, sort_order,
      quantity, stock_status_id, subtractBool, maxquantity, minimum, returnabledays,
      tax_class_id, reward_points, length, width, height, weight,
      length_class_id, weight_class_id, height_class_id,
      shippingBool, shipping_charge, statusValue, location,
      option, attribute, discount, related_product, image, long_description, unit_image,
      cby,
    ]);

    res.status(201).json({ message: "Product created successfully", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || "";
    console.log(`🔍 Search API called with query: ${search}`);

  try {
    const dataQuery = `
      SELECT 
        p.id, p.product_name, p.description, p.model, 
        p.brand_id, b.brand_name, p.category_id,
        p.sku, p.barcode, p.ean, p.price, p.tag, p.store_id, 
        p.date_available, p.sort_order,
        p.quantity, p.stock_status_id, p.subtract, p.maxquantity, 
        p.minimum, p.returnabledays,
        p.tax_class_id, p.reward_points, p.length, p.width, p.height, 
        p.weight, p.length_class_id, p.weight_class_id, p.height_class_id,
        p.shipping, p.shipping_charge, p.status, p.location,
        p.option, p.attribute, p.discount, p.related_product, 
        p.image, p.unit_image, p.long_description, p.cby, p.cdate
      FROM products p
      LEFT JOIN brands b ON b.id = p.brand_id
      WHERE 
        p.product_name ILIKE $1 OR 
        p.model ILIKE $1 OR 
        p.sku ILIKE $1 OR 
        p.barcode ILIKE $1 OR 
        b.brand_name ILIKE $1
      ORDER BY p.cdate DESC
      LIMIT $2 OFFSET $3
    `;

    const countQuery = `
      SELECT COUNT(*) 
      FROM products p
      LEFT JOIN brands b ON b.id = p.brand_id
      WHERE 
        p.product_name ILIKE $1 OR 
        p.model ILIKE $1 OR 
        p.sku ILIKE $1 OR 
        p.barcode ILIKE $1 OR 
        b.brand_name ILIKE $1
    `;

    const searchTerm = `%${search}%`;

    const [dataResult, countResult] = await Promise.all([
      pool.query(dataQuery, [searchTerm, limit, offset]),
      pool.query(countQuery, [searchTerm]),
    ]);

    res.json({
      products: dataResult.rows,
      total: parseInt(countResult.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving products", error: err.message });
  }
};



// Get single product
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT p.*, b.brand_name
       FROM products p
       JOIN brands b ON b.id = p.brand_id
       WHERE p.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving product", error: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const updates = [];
  const values = [];

  Object.keys(fields).forEach((key, index) => {
    let value = fields[key];

    // Normalize booleans for certain fields
    if (['subtract', 'shipping', 'status'].includes(key)) {
      value = parseBoolean(value);
    }

    updates.push(`${key} = $${index + 1}`);
    values.push(value);
  });

  const query = `
    UPDATE products
    SET ${updates.join(", ")}, udate = CURRENT_TIMESTAMP
    WHERE id = $${values.length + 1}
  `;

  try {
    await pool.query(query, [...values, id]);
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};
