import { Schema, model, Document } from 'mongoose';

// export type TCar = {
//   name: string;
//   description: string;
//   color: string;
//   isElectric: boolean;
//   status: 'available' | 'unavailable';
//   features: string[];
//   pricePerHour: number;
//   isDeleted: boolean;
// };
export interface ICar extends Document {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: 'available' | 'unavailable';
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
}

const carSchema = new Schema<ICar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// export const Car = model<TCar>('Car', carSchema);
export default model<ICar>('Car', carSchema);
