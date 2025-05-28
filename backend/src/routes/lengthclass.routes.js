


// routes/lengthClassRoutes.js
import express from 'express';
import {
  createLengthClass,
  getAllLengthClasses,
  getLengthClassById,
  updateLengthClass,
  deleteLengthClass
} from '../controllers/lengthclass.controller.js';

const router = express.Router();

router.post('/', createLengthClass);
router.get('/', getAllLengthClasses);
router.get('/:id', getLengthClassById);
router.put('/:id', updateLengthClass);
router.delete('/:id', deleteLengthClass);

export default router;
