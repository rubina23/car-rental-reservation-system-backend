import { Schema, model, connect, Types } from 'mongoose';

// Define the TypeScript type
export type TBooking = {
  date: Date;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime: string;
  totalCost: number;
};

// // Example usage
// async function run() {
//   // Connect to MongoDB
//   await connect('mongodb://localhost:27017/carDB');

//   // Create a new booking instance
//   const newBooking = new Booking({
//     date: new Date(),
//     user: '60d0fe4f5311236168a109ca', // Example user ID
//     car: '60d0fe4f5311236168a109cb', // Example car ID
//     startTime: '10:00', // Example start time
//     endTime: '14:00', // Example end time
//     totalCost: 200, // Example total cost
//   });

//   // Save the booking to the database
//   await newBooking.save();

//   console.log('Booking saved successfully!');
// }

// run().catch((err) => console.log(err));
