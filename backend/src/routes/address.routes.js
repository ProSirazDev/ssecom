import express from 'express';
import { getAddressesByUser } from '../controllers/address.contoller.js';

const router = express.Router();


router.get('/:userId', getAddressesByUser);


export default router;
