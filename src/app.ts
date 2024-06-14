import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { CarRoutes } from './app/modules/car/car.route';
import { BookingRoutes } from './app/modules/booking/booking.route';
const app = express();
// const app: Application = express();
// const port = 3000;

//parsers
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/auth/signup', UserRoutes);
app.use('/api/cars', CarRoutes);
app.use('/api', BookingRoutes);

// const getAController = (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// };

// app.get('/', getAController);

export default app;
