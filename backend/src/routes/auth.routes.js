import express from "express";
import { firebaseLogin, getMe, loginUser, logoutUser, registerUser, requestOtp, verifyOtp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/firebase-login', firebaseLogin);

router.get('/me', getMe);
router.post('/logout', logoutUser);

export default router