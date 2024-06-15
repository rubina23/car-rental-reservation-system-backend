import config from './app/config';
import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';
import bookingRoutes from './routes/bookingRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Car Rental Reservation System Backend');
});

app.use(errorHandler);

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // console.log('Connect to mongoDB');

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

main();

/**
 * run server: node  .\dist\server.js
 *
 */
