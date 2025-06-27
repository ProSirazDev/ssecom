import express from 'express';
import { createAttribute, getAttribute, listAttributes, updateAttribute } from '../controllers/attribute.controller.js';


const router = express.Router();

router.post('/', createAttribute);
router.get('/:id', getAttribute);
router.get('/', listAttributes);
router.put('/:id', updateAttribute);

export default router;
