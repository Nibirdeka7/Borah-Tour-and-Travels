import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

// Parse .env / .env.local manually
function loadEnv() {
  const envPaths = ['.env.local', '.env'];
  for (const envFile of envPaths) {
    const fullPath = path.resolve(process.cwd(), envFile);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...valueParts] = trimmed.split('=');
          const val = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
          if (key.trim() && !process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const MONGO_URI = process.env.MONGO_URI || '';
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'nibirdeka70@gmail.com').trim().toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'nibir@borah2026';

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI is missing in environment variables');
  process.exit(1);
}

// Inline Mongoose Schemas for direct script execution
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'ADMIN' },
});

const TourPackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  price: { type: String, default: 'Contact Owner' },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  categories: [{ type: String }],
  route: { type: String, default: '' },
  activityLevel: { type: String, default: 'Moderate Sightseeing' },
  groupSize: { type: String, default: '1-8 Pax' },
  highlights: [{ type: String }],
  itinerary: [
    {
      day: String,
      title: String,
      overnight: String,
      description: String,
      highlights: [String],
    },
  ],
});

const PlaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  query: { type: String, default: '' },
  distance: { type: String, default: '' },
  travelTime: { type: String, default: '' },
  description: { type: String, default: '' },
  embedUrl: { type: String, default: '' },
  image: { type: String, default: '' },
});

const GalleryImageSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  category: { type: String, default: 'travelers' },
  image: { type: String, required: true },
});

const VehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandModel: { type: String, default: '' },
  year: { type: String, default: '2026' },
  seats: { type: String, default: '5 Seats' },
  transmission: { type: String, default: 'Manual' },
  fuel: { type: String, default: 'Diesel' },
  ratePerDay: { type: String, required: true },
  category: { type: String, default: 'sedan' },
  tag: { type: String, default: '' },
  image: { type: String, default: '' },
  seatOptions: [{ label: String, seats: String, ratePerDay: String }],
});

const SiteSettingsSchema = new mongoose.Schema({
  phoneNumbers: [{ type: String }],
  whatsappNumber: { type: String, default: '917002674473' },
  heroTitle: { type: String, default: 'A new way to live with Nature' },
  heroSubtitle: { type: String, default: 'We redesigned how travelers connect with nature, explore hidden waterfalls, and experience Assamese & NorthEast culture all in one customized private tour service.' },
  announcementText: { type: String, default: '' },
  ownerBadgeText: { type: String, default: 'Contact Direct Owner – No Commission' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const TourPackage = mongoose.models.TourPackage || mongoose.model('TourPackage', TourPackageSchema);
const Place = mongoose.models.Place || mongoose.model('Place', PlaceSchema);
const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);
const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

// --- PREFILLED HOME PAGE DATA ---

const PACKAGES_DATA = [
  // MEGHALAYA PACKAGES
  {
    title: "1 Day Meghalaya Express Itinerary",
    slug: "meghalaya-1day",
    price: "Contact Owner",
    duration: "1 Day",
    image: "/img/cherrapunji/cerrapunji.png",
    gallery: ["/img/cherrapunji/cerrapunji.png", "/img/shillong/shillong.png"],
    categories: ["meghalaya", "short"],
    route: "Guwahati → Cherrapunji → Guwahati",
    activityLevel: "Moderate Sightseeing",
    groupSize: "1-8 Pax",
    highlights: ["Umiam Lake & Elephant Falls", "Mawkdok Dympep Valley View Point", "Seven Sisters Waterfall, Mawsmai Cave & Eco Park"],
    itinerary: [
      {
        day: "Day 01",
        title: "Guwahati to Cherrapunji Sightseeing & Return",
        overnight: "Departure",
        description: "Early pickup from Guwahati. Scenic drive stopping at Umiam Lake viewpoint, Elephant Falls, and Mawkdok Dympep Valley View Point. Explore Seven Sisters Waterfall, Mawsmai Cave, and Eco Park before returning to Guwahati in the evening.",
        highlights: ["Umiam Lake view stop", "Elephant Falls hike", "Mawkdok Dympep Valley View Point", "Seven Sisters Waterfall view", "Mawsmai Cave exploration", "Eco Park viewpoint walk", "Return drive to Guwahati"]
      }
    ]
  },
  {
    title: "2 Days Meghalaya Abode of Clouds Tour",
    slug: "meghalaya-2d1n",
    price: "Contact Owner",
    duration: "2 Days / 1 Night",
    image: "/img/shillong/shillong.png",
    gallery: ["/img/shillong/shillong.png", "/img/cherrapunji/cerrapunji.png"],
    categories: ["meghalaya", "short"],
    route: "Guwahati → Cherrapunji → Guwahati",
    activityLevel: "Easy / Moderate",
    groupSize: "2-8 Pax",
    highlights: ["Umiam Lake, Don Bosco & Air Force Museums", "Garden of Caves & Arwah Cave", "Nohkalikai, Wei Sawdong & Lyngksiar Waterfalls"],
    itinerary: [
      {
        day: "Day 01",
        title: "Guwahati to Cherrapunji via Museums & Caves",
        overnight: "Cherrapunji",
        description: "Drive from Guwahati to Cherrapunji. Visit Umiam Lake, Don Bosco Museum, Air Force Museum, Elephant Falls, Mawkdok Dympep Valley View Point, Garden of Caves, and mysterious Arwah Cave. Overnight stay in Cherrapunji.",
        highlights: ["Umiam Lake & Don Bosco Museum", "Air Force Museum & Elephant Falls", "Mawkdok Dympep Valley View Point", "Garden of Caves & Arwah Cave exploration", "Night stay in Cherrapunji"]
      },
      {
        day: "Day 02",
        title: "Cherrapunji Waterfalls & Return to Guwahati",
        overnight: "Departure",
        description: "Explore Seven Sisters Waterfall, Mawsmai Cave, Eco Park, majestic Nohkalikai Falls, step waterfall Wei Sawdong, and Lyngksiar Waterfall. Drive back to Guwahati after completing sightseeing.",
        highlights: ["Seven Sisters Waterfall & Mawsmai Cave", "Eco Park & Nohkalikai Falls viewpoint", "Wei Sawdong & Lyngksiar Waterfalls", "Return drive to Guwahati"]
      }
    ]
  },
  {
    title: "3 Days Meghalaya Waterfall & Cave Tour",
    slug: "meghalaya-3d2n",
    price: "Contact Owner",
    duration: "3 Days / 2 Nights",
    image: "/img/cherrapunji/cerrapunji.png",
    gallery: ["/img/cherrapunji/cerrapunji.png", "/img/shillong/shillong.png"],
    categories: ["meghalaya", "short", "family"],
    route: "Guwahati → Cherrapunji → Guwahati",
    activityLevel: "Easy Sightseeing",
    groupSize: "2-8 Pax",
    highlights: ["Shillong Peak & Garden of Caves", "Nohkalikai, Dainthlen, Wei Sawdong & Prut Falls", "Kynrem Waterfall, Arwah Cave & Bull's Trek"],
    itinerary: [
      {
        day: "Day 01",
        title: "Guwahati to Cherrapunji",
        overnight: "Cherrapunji",
        description: "Pickup from Guwahati. Sightseeing includes Umiam Lake, Don Bosco Museum, Shillong Peak, Air Force Museum, Elephant Falls, Mawkdok Dympep Valley View Point, and Garden of Caves. Night stay in Cherrapunji.",
        highlights: ["Umiam Lake & Shillong Peak views", "Don Bosco & Air Force Museums", "Elephant Falls & Mawkdok Valley", "Garden of Caves & Night stay Cherrapunji"]
      },
      {
        day: "Day 02",
        title: "Cherrapunji Local Sightseeing",
        overnight: "Cherrapunji",
        description: "Full day local waterfall exploration: Nohkalikai Falls, Dainthlen Falls, 3-tiered Wei Sawdong Waterfall, Prut Falls, Lyngksiar Waterfall, and Eco Park. Night stay in Cherrapunji.",
        highlights: ["Nohkalikai & Dainthlen Waterfalls", "Wei Sawdong 3-tier waterfall hike", "Prut Falls & Lyngksiar Waterfall", "Eco Park view & Night stay Cherrapunji"]
      },
      {
        day: "Day 03",
        title: "Cherrapunji to Guwahati",
        overnight: "Departure",
        description: "Visit Kynrem Waterfall, Seven Sisters Waterfall, Mawsmai Cave, Arwah Cave, and Bull's Trek. Drive back to Guwahati after sightseeing.",
        highlights: ["Kynrem & Seven Sisters Waterfalls", "Mawsmai Cave & Arwah Cave walk", "Bull's Trek exploration", "Return drive to Guwahati"]
      }
    ]
  },
  {
    title: "4 Days Meghalaya & Mawlynnong Tour",
    slug: "meghalaya-4d3n",
    price: "Contact Owner",
    duration: "4 Days / 3 Nights",
    image: "/img/mawlynnong/bac 4.png",
    gallery: ["/img/mawlynnong/bac 4.png", "/img/dawki/bac 3.png", "/img/cherrapunji/cerrapunji.png"],
    categories: ["meghalaya", "family"],
    route: "Guwahati → Cherrapunji → Mawlynnong → Guwahati",
    activityLevel: "Moderate Sightseeing",
    groupSize: "2-8 Pax",
    highlights: ["Cherrapunji Waterfalls & Cave Circuit", "Mawlynnong Cleanest Village in Asia", "Living Root Bridge & Dawki River Boating"],
    itinerary: [
      {
        day: "Day 01",
        title: "Guwahati to Cherrapunji",
        overnight: "Cherrapunji",
        description: "Pickup from Guwahati. Visit Umiam Lake, Don Bosco Museum, Shillong Peak, Air Force Museum, Elephant Falls, Mawkdok Dympep Valley View Point, and Garden of Caves. Night stay in Cherrapunji.",
        highlights: ["Umiam Lake & Shillong Peak", "Elephant Falls & Mawkdok Valley", "Night stay in Cherrapunji"]
      },
      {
        day: "Day 02",
        title: "Cherrapunji Local Sightseeing",
        overnight: "Cherrapunji",
        description: "Visit Nohkalikai Falls, Dainthlen Falls, Wei Sawdong Waterfall, Prut Falls, Lyngksiar Waterfall, and Eco Park. Night stay in Cherrapunji.",
        highlights: ["Nohkalikai & Dainthlen Falls", "Wei Sawdong & Prut Falls", "Night stay in Cherrapunji"]
      },
      {
        day: "Day 03",
        title: "Cherrapunji to Mawlynnong Drive",
        overnight: "Mawlynnong",
        description: "Visit Kynrem Waterfall, Seven Sisters Waterfall, Mawsmai Cave, and Arwah Cave. Drive to Asia's cleanest village, Mawlynnong. Night stay in Mawlynnong.",
        highlights: ["Kynrem & Seven Sisters Waterfalls", "Mawsmai & Arwah Caves", "Drive to Mawlynnong & Night stay"]
      },
      {
        day: "Day 04",
        title: "Mawlynnong, Root Bridge & Dawki to Guwahati",
        overnight: "Departure",
        description: "Explore Mawlynnong Village, hike to the Single Living Root Bridge in Riwai, and experience transparent boat riding on Umngot River in Dawki. Drive back to Guwahati (~5-6 hours).",
        highlights: ["Mawlynnong Cleanest Village walk", "Single Living Root Bridge hike", "Dawki Umngot River boating", "Return drive to Guwahati (~5-6 hours)"]
      }
    ]
  },
  {
    title: "5 Days Meghalaya Full Odyssey",
    slug: "meghalaya-5d4n",
    price: "Contact Owner",
    duration: "5 Days / 4 Nights",
    image: "/img/dawki/bac 3.png",
    gallery: ["/img/dawki/bac 3.png", "/img/mawlynnong/bac 4.png", "/img/shillong/shillong.png"],
    categories: ["meghalaya", "family", "adventure"],
    route: "Guwahati → Cherrapunji → Upper Shillong → Dawki → Guwahati",
    activityLevel: "Moderate",
    groupSize: "2-8 Pax",
    highlights: ["Laitlum Canyon & Living Root Bridge", "Dawki Umngot River Boating", "Krang Suri & Phe Phe Waterfalls"],
    itinerary: [
      {
        day: "Day 01",
        title: "Guwahati to Cherrapunji",
        overnight: "Cherrapunji",
        description: "Visit Umiam Lake, Don Bosco Museum, Shillong Peak, Air Force Museum, Elephant Falls, Mawkdok Dympep Valley View Point, and Garden of Caves. Night stay in Cherrapunji.",
        highlights: ["Umiam Lake & Shillong Peak", "Elephant Falls & Mawkdok Valley", "Night stay in Cherrapunji"]
      },
      {
        day: "Day 02",
        title: "Cherrapunji Waterfalls Local Sightseeing",
        overnight: "Cherrapunji",
        description: "Explore Nohkalikai Falls, Dainthlen Falls, Wei Sawdong Waterfall, Prut Falls, Lyngksiar Waterfall, and Eco Park. Night stay in Cherrapunji.",
        highlights: ["Nohkalikai & Wei Sawdong Falls", "Prut & Lyngksiar Waterfalls", "Night stay in Cherrapunji"]
      },
      {
        day: "Day 03",
        title: "Cherrapunji to Upper Shillong",
        overnight: "Upper Shillong",
        description: "Visit Kynrem Waterfall, Seven Sisters Waterfall, Mawsmai Cave, Arwah Cave, and Bull's Trek. Drive to Upper Shillong. Night stay in Upper Shillong.",
        highlights: ["Kynrem & Seven Sisters Waterfalls", "Mawsmai & Arwah Caves", "Night stay in Upper Shillong"]
      },
      {
        day: "Day 04",
        title: "Upper Shillong to Dawki via Laitlum & Mawlynnong",
        overnight: "Dawki",
        description: "Explore Laitlum Canyon gorges, Mawlynnong Village, Riwai Living Root Bridge, and crystal clear Dawki River boating. Night stay in Dawki.",
        highlights: ["Laitlum Canyon panoramic views", "Mawlynnong & Living Root Bridge", "Dawki River boating & Night stay"]
      },
      {
        day: "Day 05",
        title: "Dawki to Guwahati via Krang Suri & Phe Phe",
        overnight: "Departure",
        description: "Visit the stunning blue natural pools of Krang Suri Waterfall and multi-tiered Phe Phe Waterfall. Drive back to Guwahati (~5-6 hours).",
        highlights: ["Krang Suri blue pool waterfall", "Phe Phe Waterfall exploration", "Return drive to Guwahati (~5-6 hours)"]
      }
    ]
  },

  // TAWANG & ARUNACHAL PACKAGES
  {
    title: "6 Days Tawang & Sela Pass Express",
    slug: "tawang-6d5n",
    price: "Contact Owner",
    duration: "6 Days / 5 Nights",
    image: "/img/tawang/tawang.png",
    gallery: ["/img/tawang/tawang.png", "/img/tawang/sela_pass.png", "/img/dirang/sangti_valley.png"],
    categories: ["tawang", "adventure"],
    route: "Guwahati → Dirang → Tawang → Bomdila → Guwahati",
    activityLevel: "Mountain High Altitude",
    groupSize: "2-6 Pax",
    highlights: ["Kameng River, Tippi Orchid & Nichiphula Waterfall", "Sela Pass (13,700 ft), Sela Lake & Nuranang Falls", "Bum La Pass (15,200 ft), Madhuri Lake & Tawang Monastery"],
    itinerary: [
      {
        day: "Day 01",
        title: "Guwahati to Dirang Scenic Drive",
        overnight: "Dirang",
        description: "Drive from Guwahati to Dirang (Approx. 7-8 Hours). En route visit Kameng River near Bhalukpong, Tippi Orchid Centre, Nichiphula Waterfall, and Nag Mandir. Night stay in Dirang.",
        highlights: ["Drive Guwahati to Dirang (7-8 hrs)", "Kameng River & Tippi Orchid Centre", "Nichiphula Waterfall & Nag Mandir", "Night stay in Dirang"]
      },
      {
        day: "Day 02",
        title: "Dirang to Tawang via Sela Pass",
        overnight: "Tawang",
        description: "Drive from Dirang to Tawang (Approx. 6-7 Hours). Stop at world-famous Sela Pass (13,700 ft), serene Sela Lake, Jaswant Garh War Memorial, and majestic Nuranang (Jung) Falls. Night stay in Tawang.",
        highlights: ["Sela Pass (13,700 ft altitude)", "Beautiful Sela Lake view", "Jaswant Garh War Memorial", "Nuranang Falls photo stop", "Night stay in Tawang"]
      },
      {
        day: "Day 03",
        title: "Explore Tawang – Bum La Pass Circuit",
        overnight: "Tawang",
        description: "Full day high-altitude circuit (8-10 Hours): visit Indo-China border at Bum La Pass, Pangateng Tso (P.T. Tso) Lake, and scenic Madhuri Lake (Sangetsar Tso). Night stay in Tawang.",
        highlights: ["Bum La Pass (Subject to Permit/Weather)", "Madhuri Lake (Sangetsar Tso)", "Pangateng Tso (P.T. Tso) Lake", "Night stay in Tawang"]
      },
      {
        day: "Day 04",
        title: "Explore Tawang Local Places",
        overnight: "Tawang",
        description: "Full day local sightseeing (7-8 Hours): visit historic Tawang Monastery (largest in India), Giant Buddha Statue, Tawang War Memorial, Khinmey Nyingma Monastery, Ani Gompa, and Ugyenling Monastery. Night stay in Tawang.",
        highlights: ["Tawang Monastery (Asia's 2nd largest)", "Giant Buddha Statue", "Tawang War Memorial light & sound", "Ani Gompa & Ugyenling Monastery", "Night stay in Tawang"]
      },
      {
        day: "Day 05",
        title: "Tawang to Bomdila via Sela Tunnel",
        overnight: "Bomdila",
        description: "Drive from Tawang to Bomdila (Approx. 7-8 Hours). Drive through Sela Tunnel, visit Dirang Monastery, and explore Sangti Valley. Night stay in Bomdila.",
        highlights: ["Sela Tunnel modern mountain engineering", "Dirang Monastery visit", "Sangti Valley view point", "Night stay in Bomdila"]
      },
      {
        day: "Day 06",
        title: "Bomdila to Guwahati",
        overnight: "Departure",
        description: "Visit Bomdila Monastery in the morning. Drive back to Guwahati (Approx. 8-9 Hours) for drop-off at Guwahati Airport or Railway Station.",
        highlights: ["Bomdila Monastery visit", "Drive back to Guwahati (8-9 hrs)", "Guwahati Airport / Station drop-off"]
      }
    ]
  },

  // ASSAM KAZIRANGA PACKAGES
  {
    title: "Kaziranga Express Wildlife Tour",
    slug: "kaziranga-2d1n",
    price: "Contact Owner",
    duration: "2 Days / 1 Night",
    image: "/img/kaziranga/kaziranga.png",
    gallery: ["/img/kaziranga/kaziranga.png", "/img/kaziranga/kaziranga_orchid.png", "/img/guwahati/guwahati.png"],
    categories: ["assam", "short"],
    route: "Guwahati - Kaziranga - Guwahati",
    activityLevel: "Moderate Wildlife",
    groupSize: "2-6 Pax",
    highlights: ["Maha Mrityunjay Temple Visit", "Kaziranga Orchid & Biodiversity Park", "Early Morning Elephant / Jeep Safari"],
    itinerary: [
      {
        day: "Day 01",
        title: "Guwahati to Kaziranga & Orchid Park",
        overnight: "Kaziranga",
        description: "Drive from Guwahati to Kaziranga (~230 km). Visit Maha Mrityunjay Temple. Explore Kaziranga Orchid Park flora & culture. Night stay in Kaziranga.",
        highlights: ["Drive Guwahati to Kaziranga (~230 km)", "Maha Mrityunjay Temple", "Kaziranga Orchid Park", "Night stay in Kaziranga"]
      },
      {
        day: "Day 02",
        title: "Kaziranga Wildlife Safari & Return to Guwahati",
        overnight: "Departure",
        description: "Early morning Elephant Safari / Jeep Safari to spot One-Horned Rhinos. Drive back to Guwahati.",
        highlights: ["Elephant / Jeep Safari", "One-Horned Rhino spotting", "Return to Guwahati"]
      }
    ]
  }
];

const PLACES_DATA = [
  {
    name: "Full Circuit Loop",
    slug: "circuit",
    query: "Guwahati to Tawang to Kaziranga to Cherrapunji",
    embedUrl: "https://maps.google.com/maps?q=Guwahati+to+Tawang+to+Kaziranga+to+Cherrapunji&t=&z=6&ie=UTF8&iwloc=&output=embed",
    distance: "~400-800 km Circuit",
    travelTime: "3 to 9 Days Circuit",
    description: "Our signature tour circuit starting from Guwahati Airport across Meghalaya, Assam & Arunachal Pradesh.",
    image: "/img/shillong/shillong.png"
  },
  {
    name: "Tawang & Sela Pass",
    slug: "tawang",
    query: "Tawang, Arunachal Pradesh",
    embedUrl: "https://maps.google.com/maps?q=Tawang,Arunachal+Pradesh&t=&z=11&ie=UTF8&iwloc=&output=embed",
    distance: "~440 km from Guwahati",
    travelTime: "High Altitude Circuit",
    description: "Himalayan haven featuring Tawang Monastery, Bum La Pass (15,200 ft) & Madhuri Lake.",
    image: "/img/tawang/tawang.png"
  },
  {
    name: "Sela Pass & Lake",
    slug: "sela_pass",
    query: "Sela Pass, Arunachal Pradesh",
    embedUrl: "https://maps.google.com/maps?q=Sela+Pass,Arunachal+Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed",
    distance: "13,700 ft Altitude",
    travelTime: "En route to Tawang",
    description: "Dramatic mountain pass with sacred Sela Lake, Jaswant Garh War Memorial & Sela Tunnel.",
    image: "/img/tawang/tawang.png"
  },
  {
    name: "Sangti Valley & Dirang",
    slug: "sangti_valley",
    query: "Sangti Valley, Dirang, Arunachal Pradesh",
    embedUrl: "https://maps.google.com/maps?q=Sangti+Valley,Arunachal+Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed",
    distance: "15 km from Dirang",
    travelTime: "Scenic Valley Drive",
    description: "Alpine river valley with local sheep farm, natural hot water spring & historic Dirang Dzong.",
    image: "/img/dirang/sangti_valley.png"
  },
  {
    name: "Guwahati",
    slug: "guwahati",
    query: "Guwahati, Assam",
    embedUrl: "https://maps.google.com/maps?q=Guwahati,Assam&t=&z=12&ie=UTF8&iwloc=&output=embed",
    distance: "Pickup Hub (0 km)",
    travelTime: "Airport / Station Pickup",
    description: "Kamakhya Temple, Umananda, Basistha Temple, Zoo & Brahmaputra riverfront.",
    image: "/img/guwahati/guwahati.png"
  },
  {
    name: "Kaziranga & Umrangso",
    slug: "kaziranga",
    query: "Kaziranga National Park, Assam",
    embedUrl: "https://maps.google.com/maps?q=Kaziranga+National+Park,Assam&t=&z=11&ie=UTF8&iwloc=&output=embed",
    distance: "230 km from Guwahati",
    travelTime: "4.5 Hours Drive",
    description: "UNESCO Rhinos, Elephant/Jeep Safaris, Orchid Park, Panimur Falls & Umrangso Golf Field.",
    image: "/img/kaziranga/kaziranga.png"
  },
  {
    name: "Cherrapunji & Root Bridges",
    slug: "cherrapunji",
    query: "Cherrapunji, Meghalaya",
    embedUrl: "https://maps.google.com/maps?q=Cherrapunji,Meghalaya&t=&z=12&ie=UTF8&iwloc=&output=embed",
    distance: "54 km from Shillong",
    travelTime: "1.5 Hours Mountain Drive",
    description: "Land of waterfalls, Nohkalikai Falls, double-decker living root bridges & limestone caves.",
    image: "/img/cherrapunji/cerrapunji.png"
  },
  {
    name: "Dawki & Mawlynnong",
    slug: "dawki",
    query: "Dawki, Meghalaya",
    embedUrl: "https://maps.google.com/maps?q=Dawki,Meghalaya&t=&z=13&ie=UTF8&iwloc=&output=embed",
    distance: "85 km from Cherrapunji",
    travelTime: "2.5 Hours Drive",
    description: "Crystal clear Umngot river boating, Krang Suri falls & Asia's cleanest village Mawlynnong.",
    image: "/img/dawki/bac 3.png"
  }
];

const GALLERY_DATA = [
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.45 PM.jpeg", title: "Cherrapunji Waterfalls", category: "meghalaya" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.45 PM (1).jpeg", title: "Dawki Umngot River Boating", category: "meghalaya" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.46 PM.jpeg", title: "Living Root Bridge Trek", category: "meghalaya" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.47 PM.jpeg", title: "Tawang Monastery", category: "tawang" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.47 PM (1).jpeg", title: "Sela Lake Snow View", category: "tawang" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.48 PM.jpeg", title: "Sangti Valley River Bank", category: "tawang" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.48 PM (1).jpeg", title: "Kaziranga Safari Experience", category: "assam" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.49 PM.jpeg", title: "Krang Suri Blue Pool", category: "meghalaya" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.49 PM (1).jpeg", title: "Double Decker Root Bridge", category: "meghalaya" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.49 PM (2).jpeg", title: "Umrangso Golf Course", category: "assam" },
  { image: "/gallery/WhatsApp Image 2026-09-03 at 6.19.50 PM.jpeg", title: "Private Fleet Traveller", category: "fleet" }
];

const VEHICLES_DATA = [
  {
    name: "Maruti Suzuki Swift Dzire",
    brandModel: "Maruti Suzuki",
    year: "New Model",
    seats: "5 Seats",
    transmission: "Manual",
    fuel: "Petrol",
    ratePerDay: "₹4,000",
    category: "sedan",
    tag: "Latest Edition",
    image: "/img/vehicles/marutiSuzukiSwiftDezire1.png"
  },
  {
    name: "Maruti Suzuki Ertiga",
    brandModel: "Maruti Suzuki Ertiga",
    year: "New Model",
    seats: "8 Seats",
    transmission: "Manual",
    fuel: "Petrol",
    ratePerDay: "₹5,500",
    category: "suv",
    tag: "Family Favorite",
    image: "/img/vehicles/ertiga.png"
  },
  {
    name: "Toyota Innova Crysta",
    brandModel: "Toyota Crysta",
    year: "New Model",
    seats: "8 Seats",
    transmission: "Manual",
    fuel: "Diesel",
    ratePerDay: "₹6,500",
    category: "suv",
    tag: "Premium Comfort",
    image: "/img/vehicles/innovaCrysta.png"
  },
  {
    name: "Force Traveller",
    brandModel: "Force Motors",
    year: "New Model",
    seats: "12 Seats",
    transmission: "Manual",
    fuel: "Diesel",
    ratePerDay: "₹7,500",
    category: "tempo",
    tag: "Group Tour Special",
    image: "/img/vehicles/traveller.png",
    seatOptions: [
      { label: "12 Seater", seats: "12 Seats", ratePerDay: "₹7,500" },
      { label: "16 Seater", seats: "16 Seats", ratePerDay: "₹8,500" },
      { label: "25 Seater", seats: "25 Seats", ratePerDay: "₹9,500" }
    ]
  },
  {
    name: "Force Urbania",
    brandModel: "Force Motors Luxury",
    year: "New Model",
    seats: "10 Seats",
    transmission: "Manual",
    fuel: "Diesel",
    ratePerDay: "₹8,500",
    category: "tempo",
    tag: "Luxury Group Cruiser",
    image: "/img/vehicles/urbania.png",
    seatOptions: [
      { label: "10 Seater", seats: "10 Seats", ratePerDay: "₹8,500" },
      { label: "13 Seater", seats: "13 Seats", ratePerDay: "₹9,000" },
      { label: "17 Seater", seats: "17 Seats", ratePerDay: "₹9,500" }
    ]
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully!');

    // 1. Seed Admin Users
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const adminEmails = ['sintuborah81@gmail.com', 'nibirdeka70@gmail.com'];
    for (const email of adminEmails) {
      await User.deleteMany({ email });
      await User.create({
        email,
        passwordHash,
        role: 'ADMIN',
      });
      console.log(`✓ Admin User created/updated: ${email}`);
    }

    // 2. Seed Site Settings
    await SiteSettings.deleteMany({});
    await SiteSettings.create({
      phoneNumbers: ['+91 70026 74473', '+91 88220 31804'],
      whatsappNumber: '917002674473',
      heroTitle: 'A new way to live with Nature',
      heroSubtitle:
        'We redesigned how travelers connect with nature, explore hidden waterfalls, and experience Assamese & NorthEast culture all in one customized private tour service.',
      ownerBadgeText: 'Contact Direct Owner – No Commission',
    });
    console.log('✓ Site Settings seeded');

    // 3. Seed Tour Packages
    await TourPackage.deleteMany({});
    await TourPackage.insertMany(PACKAGES_DATA);
    console.log(`✓ ${PACKAGES_DATA.length} Tour Packages seeded with full day-by-day itineraries`);

    // 4. Seed Destinations & Places
    await Place.deleteMany({});
    await Place.insertMany(PLACES_DATA);
    console.log(`✓ ${PLACES_DATA.length} Destination Map Places seeded`);

    // 5. Seed Traveler Gallery Images
    await GalleryImage.deleteMany({});
    await GalleryImage.insertMany(GALLERY_DATA);
    console.log(`✓ ${GALLERY_DATA.length} Traveler Gallery Photos seeded`);

    // 6. Seed Vehicle Fleet & Rates
    await Vehicle.deleteMany({});
    await Vehicle.insertMany(VEHICLES_DATA);
    console.log(`✓ ${VEHICLES_DATA.length} Fleet Vehicles seeded`);

    console.log('\nSUCCESS: Database seeding completed 100% cleanly!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
}

seed();
