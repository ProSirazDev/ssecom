import pool from "../config/db.js"; 
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';


import jwt from 'jsonwebtoken';
import twilio from 'twilio';


const uid= uuidv4();


const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const registerUser = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      firstname,
      middlename,
      lastname,
      mobile,
      email,
      password,
      role_id,
      cby,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const usid = uuidv4();
    const cdate = new Date();

    await client.query('BEGIN');

    // Insert into users table
    const insertUserText = `
      INSERT INTO users (
        firstname, middlename, lastname, mobile, email, password,
        role_id, usid, cdate, cby, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;
    const insertUserValues = [
      firstname, middlename, lastname, mobile, email, hashedPassword,
      role_id, usid, cdate, cby, true  // <-- Boolean, not string
    ];
    await client.query(insertUserText, insertUserValues);

    // Insert into customers table
    const insertCustomerText = `
      INSERT INTO customers (id, usid, email)
      VALUES ($1, $2, $3)
    `;
    await client.query(insertCustomerText, [uid, usid, email]);

    await client.query('COMMIT');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  } finally {
    client.release();
  }
};


export const loginUser = async (req, res) => {
  const client = await pool.connect();

  try {
    const { email, password } = req.body;

    const userResult = await client.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    const user = userResult.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { usid: user.usid, email: user.email },
      process.env.JWT_SECRET, // Make sure you define this in .env
      { expiresIn: '1d' }
    );

    // ✅ Set token in HTTP-only cookie
res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // only use secure cookies in production
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // stricter cross-domain control
  maxAge: 24 * 60 * 60 * 1000,
});


    // ✅ Send user data (exclude password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        usid: user.usid,
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        email: user.email,
        role_id: user.role_id,
        status: user.status,
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
};









export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'No session token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { usid } = decoded; // ✅ match this with what you signed

    const { rows } = await pool.query(
      'SELECT usid, firstname, lastname, email, mobile, role_id, status FROM users WHERE usid = $1',
      [usid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(rows[0]);

  } catch (err) {
    console.error('❌ Error in getMe:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const client = await pool.connect();

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const result = await client.query(
      `SELECT * FROM users WHERE email = $1 AND role_id = '2aa6bcd9-597e-4563-ac01-4f7048cb8f11' AND status = 'true' LIMIT 1`,
      [email]
    );

    const admin = result.rows[0];

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials or not an admin' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token
  const token = jwt.sign(
  {
    usid: admin.usid,
    email: admin.email,
    firstname: admin.firstname,
    lastname: admin.lastname,
    name: `${admin.firstname} ${admin.lastname}`, // helpful for display
    role: 'admin'
  },
  process.env.JWT_SECRET,
  { expiresIn: '1d' }
);

    res.status(200).json({
      message: 'Admin login successful',
      token,
      admin: {
        usid: admin.usid,
        email: admin.email,
        name: `${admin.firstname} ${admin.lastname}`,
        role: admin.role_id,
      },
    });
  } catch (err) {
    console.error('Admin login failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};
