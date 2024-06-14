import express from 'express';
import {
  createBooking,
  getAllBookings,
} from '../controllers/bookingController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, getAllBookings);

export default router;
