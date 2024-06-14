import { Request, Response } from 'express';
import { BookingServices } from './booking.service';

const createBooking = async (req: Request, res: Response) => {
  try {
    const booking = req.body;
    const result = await BookingServices.createBookCarIntoDB(booking);

    res.status(200).json({
      sucess: true,
      message: 'Car Booked successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const BookingControllers = {
  createBooking,
};
