import express from 'express';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post('/bookings', BookingControllers.createBooking);

export const BookingRoutes = router;
