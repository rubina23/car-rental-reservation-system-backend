import { Request, Response } from 'express';
import { CarServices } from './car.service';

const createCar = async (req: Request, res: Response) => {
  try {
    const car = req.body;
    console.log(car);
    // const { user: userData } = req.body;

    const result = await CarServices.createCarintoDB(car);
    // const result = await UserServices.createUserintoDB(userData);
    // console.log(userData);
    // console.log(result);

    res.status(200).json({
      sucess: true,
      message: 'Car is created successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const CarControllers = {
  createCar,
};
