import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  heroTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  ownerBadgeText: string;
  customTripTitle: string;
  customTripSubtitle: string;
  leadCaptureHeadline: string;
  leadCaptureSub: string;
  footerAbout: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    phonePrimary: { type: String, default: '+91 70026 74473' },
    phoneSecondary: { type: String, default: '+91 88220 31804' },
    whatsappNumber: { type: String, default: '917002674473' },
    heroTagline: { type: String, default: 'AUTHENTICALLY NORTH EAST' },
    heroTitle: { type: String, default: 'A new way to live with Nature' },
    heroSubtitle: {
      type: String,
      default:
        'We redesigned how travelers connect with nature, explore hidden waterfalls, and experience Assamese & NorthEast culture all in one customized private tour service.',
    },
    ownerBadgeText: { type: String, default: 'Contact Direct Owner – No Commission' },
    customTripTitle: { type: String, default: 'Want a Personalized Tour Plan?' },
    customTripSubtitle: {
      type: String,
      default:
        'Tell us your tentative dates, places you wish to visit, and number of travelers. We will design a custom itinerary with a dedicated private vehicle.',
    },
    leadCaptureHeadline: { type: String, default: 'Get Instant Best Price Quote' },
    leadCaptureSub: {
      type: String,
      default: 'Leave your phone number and our travel manager will call you back within 15 minutes.',
    },
    footerAbout: {
      type: String,
      default:
        'Borah Tours & Travel is a locally operated, private tour service in Northeast India specializing in Meghalaya, Assam, and Arunachal Pradesh circuits with Guwahati airport pickups.',
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
