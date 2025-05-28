// controllers/heightClassController.js
import pool from "../config/db.js"; // Your PostgreSQL pool

export const createLengthClass = async (req, res) => {
  const { title, unit, value, cby } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO length_class (id, title, unit, value, cby, uby, cdate, udate)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING *`,
      [title, unit, value, cby]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllLengthClasses = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM length_class ORDER BY cdate DESC`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLengthClassById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM length_class WHERE id = $1`, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLengthClass = async (req, res) => {
  const { id } = req.params;
  const { title, unit, value, uby } = req.body;
  try {
    const result = await pool.query(
      `UPDATE length_class 
       SET title = $1, unit = $2, value = $3, uby = $4, udate = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING *`,
      [title, unit, value, uby, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLengthClass = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM length_class WHERE id = $1 RETURNING *`, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

