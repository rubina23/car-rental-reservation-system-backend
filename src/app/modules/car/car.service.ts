import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarintoDB = async (car: TCar) => {
  const result = await Car.create(car);
  console.log(result);
  // return result;
};

export const CarServices = {
  createCarintoDB,
};
