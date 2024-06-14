import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import Car from '../models/Car';

const carSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  isElectric: z.boolean(),
  features: z.array(z.string()),
  pricePerHour: z.number().positive(),
});

export const createCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const carData = carSchema.parse(req.body);
    const car = new Car(carData);
    await car.save();
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: 'Car created successfully',
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cars = await Car.find({ isDeleted: false });
    res.send({
      success: true,
      statusCode: 200,
      message: 'Cars retrieved successfully',
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const carId = req.params.id;
    const carData = carSchema.partial().parse(req.body);
    const car = await Car.findByIdAndUpdate(carId, carData, { new: true });
    if (!car) {
      throw new Error('Car not found');
    }
    res.send({
      success: true,
      statusCode: 200,
      message: 'Car updated successfully',
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const carId = req.params.id;
    const car = await Car.findByIdAndUpdate(
      carId,
      { isDeleted: true },
      { new: true },
    );
    if (!car) {
      throw new Error('Car not found');
    }
    res.send({
      success: true,
      statusCode: 200,
      message: 'Car deleted successfully',
      data: car,
    });
  } catch (error) {
    next(error);
  }
};
