import { Schema, model, Document, Date } from 'mongoose';
import { IUser } from './User';
import { ICar } from './Car';

interface IBooking extends Document {
  date: string;
  user: IUser['_id'];
  car: ICar['_id'];
  startTime: string;
  endTime: string | null;
  totalCost: number;
}

const bookingSchema = new Schema<IBooking>(
  {
    date: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    car: { type: Schema.Types.ObjectId, ref: 'Car', required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, default: null },
    totalCost: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default model<IBooking>('Booking', bookingSchema);
