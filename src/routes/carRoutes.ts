import express from 'express';
import {
  createCar,
  getAllCars,
  updateCar,
  deleteCar,
} from '../controllers/carController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createCar);
router.get('/', authMiddleware, getAllCars);
router.put('/:id', authMiddleware, adminMiddleware, updateCar);
router.delete('/:id', authMiddleware, adminMiddleware, deleteCar);

export default router;
