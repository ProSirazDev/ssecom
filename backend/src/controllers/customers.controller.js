import pool from "../config/db.js"; // Your PostgreSQL pool


// GET all brands
export const getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
  u.firstname || ' ' || u.middlename || ' ' || u.lastname AS name,
  u.email,
  u.mobile,
  u.status
FROM users u
JOIN customers c ON u.usid = c.usid
ORDER BY u.cdate DESC;
`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};