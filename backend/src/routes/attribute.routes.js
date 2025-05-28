import express from 'express';
import { createAttribute, getAttribute, listAttributes } from '../controllers/attribute.controller.js';


const router = express.Router();

router.post('/', createAttribute);
router.get('/:id', getAttribute);
router.get('/', listAttributes);

export default router;
