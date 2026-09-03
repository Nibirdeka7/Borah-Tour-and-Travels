import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  title: string;
  category: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title: { type: String, default: '' },
    category: { type: String, default: 'travelers' },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
