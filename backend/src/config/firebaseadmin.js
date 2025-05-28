// src/config/firebaseadmin.js
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// To get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to the service account JSON file
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

// Read the file and parse it
const serviceAccount = JSON.parse(
  await readFile(serviceAccountPath, 'utf-8')
);

// Initialize admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
