import mongoose, { Schema, Document } from 'mongoose';

export interface ISeatOption {
  label: string;
  seats: string;
  ratePerDay: string;
}

export interface IVehicle extends Document {
  name: string;
  brandModel: string;
  year: string;
  seats: string;
  transmission: string;
  fuel: string;
  ratePerDay: string;
  category: 'sedan' | 'suv' | 'tempo';
  tag: string;
  image: string;
  seatOptions: ISeatOption[];
  createdAt: Date;
  updatedAt: Date;
}

const SeatOptionSchema = new Schema<ISeatOption>({
  label: { type: String, required: true },
  seats: { type: String, required: true },
  ratePerDay: { type: String, required: true },
});

const VehicleSchema = new Schema<IVehicle>(
  {
    name: { type: String, required: true, trim: true },
    brandModel: { type: String, default: '' },
    year: { type: String, default: '2026' },
    seats: { type: String, default: '5 Seats' },
    transmission: { type: String, default: 'Manual' },
    fuel: { type: String, default: 'Diesel' },
    ratePerDay: { type: String, required: true },
    category: {
      type: String,
      enum: ['sedan', 'suv', 'tempo'],
      default: 'sedan',
    },
    tag: { type: String, default: '' },
    image: { type: String, default: '' },
    seatOptions: [SeatOptionSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Vehicle || mongoose.model<IVehicle>('Vehicle', VehicleSchema);
