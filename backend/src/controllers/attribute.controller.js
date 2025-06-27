import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createAttribute = async (req, res) => {
  const { attribute_name, attribute_value } = req.body;
  const id = uuidv4();

  try {
    const parsedValue = typeof attribute_value === 'string'
      ? JSON.parse(attribute_value)
      : attribute_value;

    const result = await pool.query(
      `INSERT INTO attributes (id, attribute_name, attribute_value)
       VALUES ($1, $2, $3::jsonb)
       RETURNING *`,
      [id, attribute_name, JSON.stringify(parsedValue)]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting attribute:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getAttribute = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM attributes WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attribute not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching attribute:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const listAttributes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM attributes ORDER BY udate DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error listing attributes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const updateAttribute = async (req, res) => {
  const { id } = req.params;
  const { attribute_name, attribute_value } = req.body;

  try {
    const result = await pool.query(
  `UPDATE attributes 
   SET attribute_name = $1, 
       attribute_value = $2::jsonb,
       udate = CURRENT_TIMESTAMP
   WHERE id = $3
   RETURNING *`,
  [
    attribute_name,
    JSON.stringify(attribute_value), // ✅ Convert to JSON string
    id
  ]
);


    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Attribute not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating attribute:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
