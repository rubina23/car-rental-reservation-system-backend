import { Schema, model, connect } from 'mongoose';

export type TCar = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: 'available' | 'unavailable';
  features: string[]; // ["Bluetooth", "AC", "Sunroof"]
  pricePerHour: number;
  isDeleted: boolean;
};
