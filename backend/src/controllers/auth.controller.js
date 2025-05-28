
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { generateOTP } from "../utils/Otp.js";
import jwt from 'jsonwebtoken';
import twilio from 'twilio';





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
      INSERT INTO customers (usid, email)
      VALUES ($1, $2)
    `;
    await client.query(insertCustomerText, [usid, email]);

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

    // 1. Find user by email
    const userResult = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Success: return user info (omit sensitive info like password)
    return res.status(200).json({
      message: 'Login successful',
      user: {
        usid: user.usid,
        firstname: user.firstname,
        middlename: user.middlename,
        lastname: user.lastname,
        email: user.email,
        role_id: user.role_id,
        status: user.status,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    client.release();
  }
};





export const requestOtp = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) return res.status(400).json({ message: 'Mobile number is required' });

  const otp = generateOTP();
  const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  try {
    const userResult = await pool.query('SELECT id FROM users WHERE mobile = $1', [mobile]);

    if (userResult.rowCount === 0) {
      // New user — insert
      await pool.query(
        `INSERT INTO users (mobile, otp, otp_expires_at, otp_verified)
         VALUES ($1, $2, $3, false)`,
        [mobile, otp, otpExpiresAt]
      );
    } else {
      // Existing user — update OTP
      await pool.query(
        `UPDATE users
         SET otp = $1, otp_expires_at = $2, otp_verified = false
         WHERE mobile = $3`,
        [otp, otpExpiresAt, mobile]
      );
    }

    // Send OTP SMS
    await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,
      to: `+91${mobile}`
    });

    res.json({ success: true, message: 'OTP sent' });
  } catch (err) {
    console.error('OTP Request Error:', err);
    res.status(500).json({ message: 'Server error during OTP request' });
  }
};


export const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  if (!mobile || !otp)
    return res.status(400).json({ message: 'Mobile and OTP are required' });

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE mobile = $1 AND otp = $2 AND otp_expires_at > NOW()`,
      [mobile, otp]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid or expired OTP' });
    }

    const user = result.rows[0];

    await pool.query(
      `UPDATE users
       SET otp_verified = true, otp = NULL, otp_expires_at = NULL
       WHERE mobile = $1`,
      [mobile]
    );

    const token = jwt.sign({ id: user.id, mobile: user.mobile }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ success: true, token });
  } catch (err) {
    console.error('OTP Verification Error:', err);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
};




/**
 * Verifies Firebase token and inserts user into PostgreSQL if not exists
 */
import admin from '../config/firebaseadmin.js';
import pool from '../config/db.js';

export const firebaseLogin = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, phone_number, displayName, email } = decodedToken;

    if (!uid || !phone_number) {
      return res.status(400).json({ error: 'Incomplete Firebase token data' });
    }

    const userCheck = await pool.query(
      'SELECT * FROM users WHERE firebase_uid = $1',
      [uid]
    );

    if (userCheck.rows.length === 0) {
      try {
        await pool.query(
          `INSERT INTO users (firstname, email, mobile, cdate, firebase_uid)
           VALUES ($1, $2, $3, NOW(), $4)`,
          [displayName || 'Unknown', email || null, phone_number, uid]
        );
      } catch (dbErr) {
        console.error('❌ DB Insert error:', dbErr);
        return res.status(500).json({ error: 'Database insert error' });
      }
    }

    return res
      .status(200)
      .cookie('token', token, {
        httpOnly: true, // More secure
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        uid,
        phone: phone_number,
        message: 'User verified and saved',
      });

  } catch (err) {
    console.error('🔥 Firebase login error:', err);
    return res.status(401).json({ error: 'Invalid Firebase token' });
  }
};

// export const getMe = async (req, res) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ error: 'No session token found' });
//     }

//     const decoded = await admin.auth().verifyIdToken(token);

//     return res.status(200).json({
//       uid: decoded.uid,
//       email: decoded.email || null,
//       phone: decoded.phone_number || null,
//       name: decoded.name || 'User',
//     });
//   } catch (err) {
//     console.error('❌ Error in /auth/me:', err);
//     return res.status(401).json({ error: 'Session expired or invalid' });
//   }
// };

// 🚪 POST /api/auth/logout — clear session cookie

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'No session token found' });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    const firebaseUid = decoded.uid;

    // Query your own users table
    const { rows } = await pool.query(
      'SELECT id, email FROM users WHERE firebase_uid = $1',
      [firebaseUid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found in database' });
    }

    const user = rows[0];

    return res.status(200).json({
      id: user.id,                      // 👈 Internal DB user ID
      uid: firebaseUid,                 // Firebase UID
      email: user.email || decoded.email || null,
      phone: decoded.phone_number || null,
      name:  decoded.name || 'User',
    });
  } catch (err) {
    console.error('❌ Error in /auth/me:', err);
    return res.status(401).json({ error: 'Session expired or invalid' });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};
