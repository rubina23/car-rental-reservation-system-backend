import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking';
import Car from '../models/Car';
import { z } from 'zod';

const bookingSchema = z.object({
  date: z.string(),
  carId: z.string(),
  startTime: z.string(),
  endTime: z.string().optional(),
});

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { date, carId, startTime, endTime } = bookingSchema.parse(req.body);
    const car = await Car.findById(carId);
    if (!car || car.status === 'unavailable') {
      throw new Error('Car is not available');
    }
    const totalCost =
      (car.pricePerHour *
        (new Date(endTime).getTime() - new Date(startTime).getTime())) /
      (1000 * 60 * 60);
    const booking = new Booking({
      date,
      user: req.user!._id,
      car: carId,
      startTime,
      endTime: endTime || null,
      totalCost,
    });
    await booking.save();
    car.status = 'unavailable';
    await car.save();
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: 'Booking created successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const bookings = await Booking.find().populate('user car');
    res.send({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// import { Request, Response, NextFunction } from 'express';
// import Car from '../models/Car';
// import { z } from 'zod';
// import Booking from '../models/Booking';

// const bookingSchema = z.object({
//   date: z.string(),
//   carId: z.string(),
//   startTime: z.string(),
//   endTime: z.string().optional(),
// });

// export const createBooking = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const { date, carId, startTime, endTime } = bookingSchema.parse(req.body);
//     const car = await Car.findById(carId);
//     if (!car || car.status === 'unavailable') {
//       throw new Error('Car is not available');
//     }
//     const totalCost =
//       (car.pricePerHour *
//         (new Date(endTime).getTime() - new Date(startTime).getTime())) /
//       (1000 * 60 * 60);
//     const booking = new Booking({
//       date,
//       user: req.user!._id,
//       // user: req.user!._id,
//       car: carId,
//       startTime,
//       endTime: endTime || null,
//       // totalCost,
//     });
//     await booking.save();
//     car.status = 'unavailable';
//     await car.save();
//     res.status(201).send({
//       success: true,
//       statusCode: 201,
//       message: 'Booking created successfully',
//       data: booking,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllBookings = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const bookings = await Booking.find().populate('user car');
//     res.send({
//       success: true,
//       statusCode: 200,
//       message: 'Bookings retrieved successfully',
//       data: bookings,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
