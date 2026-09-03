import mongoose, { Schema, Document } from 'mongoose';

export interface IPlace extends Document {
  name: string;
  slug: string;
  query: string;
  distance: string;
  travelTime: string;
  description: string;
  embedUrl: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const PlaceSchema = new Schema<IPlace>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    query: { type: String, default: '' },
    distance: { type: String, default: '' },
    travelTime: { type: String, default: '' },
    description: { type: String, default: '' },
    embedUrl: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Place || mongoose.model<IPlace>('Place', PlaceSchema);
