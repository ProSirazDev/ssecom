// customerAddressController.js
import pool from "../config/db.js";
import { v4 as uuidv4 } from 'uuid';

// CREATE
export const createAddress = async (req, res) => {
  try {
    const {
      usid, full_name, mobile_optional, address_line1,
      address_line2, landmark, city, state, postal_code,
      country = 'India', is_default = false, cby, uby
    } = req.body;

    const id = uuidv4();

    const result = await pool.query(
      `INSERT INTO customer_address (
        id, usid, full_name, mobile_optional,
        address_line1, address_line2, landmark,
        city, state, postal_code, country,
        is_default, cby, uby
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7,
        $8, $9, $10, $11,
        $12, $13, $14
      ) RETURNING *`,
      [
        id, usid, full_name, mobile_optional,
        address_line1, address_line2, landmark,
        city, state, postal_code, country,
        is_default, cby, uby
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// READ ALL BY USER
export const getAddressesByUser = async (req, res) => {
  try {
    const { usid } = req.params;
    const result = await pool.query(
      `SELECT * FROM customer_address WHERE usid = $1 ORDER BY cdate DESC`,
      [usid]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// READ ONE
export const getAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM customer_address WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// UPDATE
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      full_name, mobile_optional, address_line1,
      address_line2, landmark, city, state,
      postal_code, country, is_default, uby
    } = req.body;

    const result = await pool.query(
      `UPDATE customer_address SET
        full_name = $1,
        mobile_optional = $2,
        address_line1 = $3,
        address_line2 = $4,
        landmark = $5,
        city = $6,
        state = $7,
        postal_code = $8,
        country = $9,
        is_default = $10,
        uby = $11,
        udate = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *`,
      [
        full_name, mobile_optional, address_line1,
        address_line2, landmark, city, state,
        postal_code, country, is_default, uby, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM customer_address WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
