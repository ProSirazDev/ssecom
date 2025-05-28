// routes/weightClassRoutes.js
import express from 'express';
import {
  createWeightClass,
  getAllWeightClasses,
  getWeightClassById,
  updateWeightClass,
  deleteWeightClass
} from '../controllers/wieghtclass.controller.js';

const router = express.Router();

router.post('/', createWeightClass);
router.get('/', getAllWeightClasses);
router.get('/:id', getWeightClassById);
router.put('/:id', updateWeightClass);
router.delete('/:id', deleteWeightClass);

export default router;
