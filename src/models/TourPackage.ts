import mongoose, { Schema, Document } from 'mongoose';

export interface IItineraryStep {
  day: string;
  title: string;
  overnight: string;
  description: string;
  highlights: string[];
}

export interface ITourPackage extends Document {
  title: string;
  slug: string;
  price: string;
  duration: string;
  image: string;
  gallery: string[];
  categories: string[];
  route: string;
  activityLevel: string;
  groupSize: string;
  highlights: string[];
  itinerary: IItineraryStep[];
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryStepSchema = new Schema<IItineraryStep>({
  day: { type: String, required: true },
  title: { type: String, required: true },
  overnight: { type: String, default: '' },
  description: { type: String, default: '' },
  highlights: [{ type: String }],
});

const TourPackageSchema = new Schema<ITourPackage>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    price: { type: String, default: 'Contact Owner' },
    duration: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    categories: [{ type: String }],
    route: { type: String, default: '' },
    activityLevel: { type: String, default: 'Moderate Sightseeing' },
    groupSize: { type: String, default: '1-8 Pax' },
    highlights: [{ type: String }],
    itinerary: [ItineraryStepSchema],
  },
  { timestamps: true }
);

export default mongoose.models.TourPackage || mongoose.model<ITourPackage>('TourPackage', TourPackageSchema);
