import express from "express";
import {  adminLogin, getMe, loginUser, logoutUser, registerUser, } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/me', getMe);
router.post('/logout', logoutUser);
router.post('/admin/login', adminLogin);

export default router