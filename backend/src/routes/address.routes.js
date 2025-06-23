import express from 'express';
import { createAddress, getAddressesByUser } from '../controllers/address.contoller.js';

const router = express.Router();


router.get('/:usid', getAddressesByUser);
router.post('/', createAddress);


export default router;
