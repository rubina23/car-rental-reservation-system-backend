// import { error } from "console";
// import app from './app';
import config from './app/config';
import mongoose from 'mongoose'; //pre
import express from 'express';
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

app.use(errorHandler);

// const port = process.env.PORT || 3000;

// mongoose
//   .connect(process.env.MONGO_URI!, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB', err);
//   });

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
