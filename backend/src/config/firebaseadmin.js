// src/config/firebaseadmin.js
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // ✅ Load from Render env
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // ✅ Local dev fallback
  const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
  serviceAccount = JSON.parse(
    await readFile(serviceAccountPath, 'utf-8')
  );
}

// Initialize admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
