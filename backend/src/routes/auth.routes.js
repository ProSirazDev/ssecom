import express from "express";
import {  getMe, loginUser, logoutUser, registerUser, } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/me', getMe);
router.post('/logout', logoutUser);

export default router