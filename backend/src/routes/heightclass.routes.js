// routes/heightClassRoutes.js
import express from 'express';
import {
  createHeightClass,
  getAllHeightClasses,
  getHeightClassById,
  updateHeightClass,
  deleteHeightClass
} from '../controllers/heightclass.controller.js';

const router = express.Router();

router.post('/', createHeightClass);
router.get('/', getAllHeightClasses);
router.get('/:id', getHeightClassById);
router.put('/:id', updateHeightClass);
router.delete('/:id', deleteHeightClass);

export default router;
