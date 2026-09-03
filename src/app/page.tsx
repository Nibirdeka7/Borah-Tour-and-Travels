"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bus,
  Route,
  Hotel,
  Clock,
  CheckCircle,
  MessageSquare,
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Compass,
  Car,
  Send,
  Check,
  X,
  Loader2,
  Phone,
  Mail,
  Sparkles,
  Star,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Mountain,
  Trees,
  Filter,
  Layers
} from "lucide-react";

import WhatsAppButton from "@/components/WhatsAppButton";
import TripWizardModal from "@/components/TripWizardModal";
import PhoneLeadSection from "@/components/PhoneLeadSection";
import PackageDetailModal, { PackageData } from "@/components/PackageDetailModal";
import CarRatesSection from "@/components/CarRatesSection";
import VehicleFleetSection from "@/components/VehicleFleetSection";
import TravelerGallerySection from "@/components/TravelerGallerySection";

export default function Home() {
  const [activeRegion, setActiveRegion] = useState("meghalaya");
  const [durationFilter, setDurationFilter] = useState("all");

  // Dynamic MongoDB Content State
  const [cmsPackages, setCmsPackages] = useState<PackageData[]>([]);
  const [cmsPlaces, setCmsPlaces] = useState<any[]>([]);
  const [cmsGallery, setCmsGallery] = useState<any[]>([]);
  const [cmsVehicles, setCmsVehicles] = useState<any[]>([]);
  const [cmsSettings, setCmsSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/packages", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCmsPackages(
            data.data.map((item: any) => ({
              id: item._id || item.slug,
              title: item.title,
              price: item.price || "Contact Owner",
              duration: item.duration,
              image: item.image,
              gallery: item.gallery || [],
              categories: item.categories || ["meghalaya"],
              route: item.route || "",
              activityLevel: item.activityLevel || "Moderate Sightseeing",
              groupSize: item.groupSize || "1-8 Pax",
              highlights: item.highlights || [],
              itinerary: item.itinerary || []
            }))
          );
        }
      })
      .catch(() => { });

    fetch("/api/places", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCmsPlaces(
            data.data.map((item: any) => ({
              id: item._id || item.slug,
              name: item.name,
              query: item.query || item.name,
              embedUrl: item.embedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(item.name)}&t=&z=11&ie=UTF8&iwloc=&output=embed`,
              distance: item.distance || "",
              travelTime: item.travelTime || "",
              description: item.description || "",
              image: item.image || ""
            }))
          );
        }
      })
      .catch(() => { });

    fetch("/api/gallery", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCmsGallery(
            data.data.map((item: any) => ({
              id: item._id,
              src: item.image,
              title: item.title,
              category: item.category
            }))
          );
        }
      })
      .catch(() => { });

    fetch("/api/vehicles", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCmsVehicles(
            data.data.map((item: any) => ({
              id: item._id,
              name: item.name,
              brandModel: item.brandModel || item.name,
              year: item.year || "New Model",
              seats: item.seats || "5 Seats",
              transmission: item.transmission || "Manual",
              fuel: item.fuel || "Diesel",
              ratePerDay: item.ratePerDay || "Contact Owner",
              category: item.category || "sedan",
              tag: item.tag || "Available",
              image: item.image,
              seatOptions: item.seatOptions
            }))
          );
        }
      })
      .catch(() => { });

    fetch("/api/settings", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setCmsSettings(data.data);
        }
      })
      .catch(() => { });
  }, []);

  // Hero Video Playlist State (playing 4 videos sequentially inside the mask)
  const heroVideos = [
    { src: "/heroVid.mp4", rotate: false },
    { src: "/cherapunji.mp4", rotate: true },
    { src: "/kazaranga.mp4", rotate: true, maxDuration: 49 },
    { src: "/heroBGVideo.mp4", rotate: false },
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Background Video Preloading & Zero-Lag Playback Controller
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    heroVideos.forEach((vid, idx) => {
      const v = videoRefs.current[idx];
      if (v) {
        if (idx === currentVideoIndex) {
          v.currentTime = 0;
          v.play().catch(() => { });
        } else {
          v.pause();
        }
      }
    });
  }, [currentVideoIndex]);

  const handleHeroVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const currentVideo = heroVideos[currentVideoIndex];
    if (currentVideo.maxDuration && e.currentTarget.currentTime >= currentVideo.maxDuration) {
      handleHeroVideoEnd();
    }
  };

  // Google Map Route Locations State
  const defaultMapLocations = [
    {
      id: "circuit",
      name: "Full Circuit Loop",
      query: "Guwahati to Tawang to Kaziranga to Cherrapunji",
      embedUrl: "https://maps.google.com/maps?q=Guwahati+to+Tawang+to+Kaziranga+to+Cherrapunji&t=&z=6&ie=UTF8&iwloc=&output=embed",
      distance: "~400-800 km Circuit",
      travelTime: "3 to 9 Days Circuit",
      description: "Our signature tour circuit starting from Guwahati Airport across Meghalaya, Assam & Arunachal Pradesh."
    },
    {
      id: "tawang",
      name: "Tawang",
      query: "Tawang, Arunachal Pradesh",
      embedUrl: "https://maps.google.com/maps?q=Tawang,Arunachal+Pradesh&t=&z=11&ie=UTF8&iwloc=&output=embed",
      distance: "~440 km from Guwahati",
      travelTime: "High Altitude Circuit",
      description: "Himalayan haven featuring Tawang Monastery, Bum La Pass (15,200 ft) & Madhuri Lake."
    },
    {
      id: "sela_pass",
      name: "Sela Pass & Lake",
      query: "Sela Pass, Arunachal Pradesh",
      embedUrl: "https://maps.google.com/maps?q=Sela+Pass,Arunachal+Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed",
      distance: "13,700 ft Altitude",
      travelTime: "En route to Tawang",
      description: "Dramatic mountain pass with sacred Sela Lake, Jaswant Garh War Memorial & Sela Tunnel."
    },
    {
      id: "sangti_valley",
      name: "Sangti Valley & Dirang",
      query: "Sangti Valley, Dirang, Arunachal Pradesh",
      embedUrl: "https://maps.google.com/maps?q=Sangti+Valley,Arunachal+Pradesh&t=&z=12&ie=UTF8&iwloc=&output=embed",
      distance: "15 km from Dirang",
      travelTime: "Scenic Valley Drive",
      description: "Alpine river valley with local sheep farm, natural hot water spring & historic Dirang Dzong."
    },
    {
      id: "guwahati",
      name: "Guwahati",
      query: "Guwahati, Assam",
      embedUrl: "https://maps.google.com/maps?q=Guwahati,Assam&t=&z=12&ie=UTF8&iwloc=&output=embed",
      distance: "Pickup Hub (0 km)",
      travelTime: "Airport / Station Pickup",
      description: "Kamakhya Temple, Umananda, Basistha Temple, Zoo & Brahmaputra riverfront."
    },
    {
      id: "kaziranga",
      name: "Kaziranga & Umrangso",
      query: "Kaziranga National Park, Assam",
      embedUrl: "https://maps.google.com/maps?q=Kaziranga+National+Park,Assam&t=&z=11&ie=UTF8&iwloc=&output=embed",
      distance: "230 km from Guwahati",
      travelTime: "4.5 Hours Drive",
      description: "UNESCO Rhinos, Elephant/Jeep Safaris, Orchid Park, Panimur Falls & Umrangso Golf Field."
    },
    {
      id: "cherrapunji",
      name: "Cherrapunji",
      query: "Cherrapunji, Meghalaya",
      embedUrl: "https://maps.google.com/maps?q=Cherrapunji,Meghalaya&t=&z=12&ie=UTF8&iwloc=&output=embed",
      distance: "54 km from Shillong",
      travelTime: "1.5 Hours Mountain Drive",
      description: "Land of waterfalls, Nohkalikai Falls, double-decker living root bridges & limestone caves."
    },
    {
      id: "dawki",
      name: "Dawki & Mawlynnong",
      query: "Dawki, Meghalaya",
      embedUrl: "https://maps.google.com/maps?q=Dawki,Meghalaya&t=&z=13&ie=UTF8&iwloc=&output=embed",
      distance: "85 km from Cherrapunji",
      travelTime: "2.5 Hours Drive",
      description: "Crystal clear Umngot river boating, Krang Suri falls & Asia's cleanest village Mawlynnong."
    }
  ];

  const mapLocations = cmsPlaces.length > 0 ? cmsPlaces : defaultMapLocations;

  const [activeMapId, setActiveMapId] = useState("circuit");
  const selectedMap = mapLocations.find((m) => m.id === activeMapId) || mapLocations[0];

  // Modal States
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardPackageTitle, setWizardPackageTitle] = useState("");
  const [selectedDetailPackage, setSelectedDetailPackage] = useState<PackageData | null>(null);

  // Custom Trip Form State (Inline fallback form)
  const [fullName, setFullName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [travelers, setTravelers] = useState("");
  const [requirements, setRequirements] = useState("");
  const [errors, setErrors] = useState<{ fullName?: boolean; contactInfo?: boolean }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Package Data (Prices removed - Users contact owner directly)
  const defaultPackages: PackageData[] = [
    // --- MEGHALAYA PACKAGES ---
    {
      id: "meghalaya-1day",
      title: "1 Day Meghalaya Express Itinerary",
      price: "Contact Owner",
      duration: "1 Day",
      image: "/img/cherrapunji/cerrapunji.png",
      gallery: ["/img/cherrapunji/cerrapunji.png", "/img/shillong/shillong.png"],
      categories: ["meghalaya", "short"],
      route: "Guwahati → Cherrapunji → Guwahati",
      activityLevel: "Moderate Sightseeing",
      groupSize: "1-8 Pax",
      highlights: [
        "Umiam Lake & Elephant Falls",
        "Mawkdok Dympep Valley View Point",
        "Seven Sisters Waterfall, Mawsmai Cave & Eco Park"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Cherrapunji Sightseeing & Return",
          overnight: "Departure",
          description: "Early pickup from Guwahati. Scenic drive stopping at Umiam Lake viewpoint, Elephant Falls, and Mawkdok Dympep Valley View Point. Explore Seven Sisters Waterfall, Mawsmai Cave, and Eco Park before returning to Guwahati in the evening.",
          highlights: [
            "Umiam Lake view stop",
            "Elephant Falls hike",
            "Mawkdok Dympep Valley View Point",
            "Seven Sisters Waterfall view",
            "Mawsmai Cave exploration",
            "Eco Park viewpoint walk",
            "Return drive to Guwahati"
          ]
        }
      ]
    },
    {
      id: "meghalaya-2d1n",
      title: "2 Days Meghalaya Abode of Clouds Tour",
      price: "Contact Owner",
      duration: "2 Days / 1 Night",
      image: "/img/shillong/shillong.png",
      gallery: ["/img/shillong/shillong.png", "/img/cherrapunji/cerrapunji.png"],
      categories: ["meghalaya", "short"],
      route: "Guwahati → Cherrapunji → Guwahati",
      activityLevel: "Easy / Moderate",
      groupSize: "2-8 Pax",
      highlights: [
        "Umiam Lake, Don Bosco & Air Force Museums",
        "Garden of Caves & Arwah Cave",
        "Nohkalikai, Wei Sawdong & Lyngksiar Waterfalls"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Cherrapunji via Museums & Caves",
          overnight: "Cherrapunji",
          description: "Drive from Guwahati to Cherrapunji. Visit Umiam Lake, Don Bosco Museum, Air Force Museum, Elephant Falls, Mawkdok Dympep Valley View Point, Garden of Caves, and mysterious Arwah Cave. Overnight stay in Cherrapunji.",
          highlights: [
            "Umiam Lake & Don Bosco Museum",
            "Air Force Museum & Elephant Falls",
            "Mawkdok Dympep Valley View Point",
            "Garden of Caves & Arwah Cave exploration",
            "Night stay in Cherrapunji"
          ]
        },
        {
          day: "Day 02",
          title: "Cherrapunji Waterfalls & Return to Guwahati",
          overnight: "Departure",
          description: "Explore Seven Sisters Waterfall, Mawsmai Cave, Eco Park, majestic Nohkalikai Falls, step waterfall Wei Sawdong, and Lyngksiar Waterfall. Drive back to Guwahati after completing sightseeing.",
          highlights: [
            "Seven Sisters Waterfall & Mawsmai Cave",
            "Eco Park & Nohkalikai Falls viewpoint",
            "Wei Sawdong & Lyngksiar Waterfalls",
            "Return drive to Guwahati"
          ]
        }
      ]
    },
    {
      id: "meghalaya-3d2n",
      title: "3 Days Meghalaya Waterfall & Cave Tour",
      price: "Contact Owner",
      duration: "3 Days / 2 Nights",
      image: "/img/cherrapunji/cerrapunji.png",
      gallery: ["/img/cherrapunji/cerrapunji.png", "/img/shillong/shillong.png"],
      categories: ["meghalaya", "short", "family"],
      route: "Guwahati → Cherrapunji → Guwahati",
      activityLevel: "Easy Sightseeing",
      groupSize: "2-8 Pax",
      highlights: [
        "Shillong Peak & Garden of Caves",
        "Nohkalikai, Dainthlen, Wei Sawdong & Prut Falls",
        "Kynrem Waterfall, Arwah Cave & Bull's Trek"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Cherrapunji",
          overnight: "Cherrapunji",
          description: "Pickup from Guwahati. Sightseeing includes Umiam Lake, Don Bosco Museum, Shillong Peak, Air Force Museum, Elephant Falls, Mawkdok Dympep Valley View Point, and Garden of Caves. Night stay in Cherrapunji.",
          highlights: [
            "Umiam Lake & Shillong Peak views",
            "Don Bosco & Air Force Museums",
            "Elephant Falls & Mawkdok Valley",
            "Garden of Caves & Night stay Cherrapunji"
          ]
        },
        {
          day: "Day 02",
          title: "Cherrapunji Local Sightseeing",
          overnight: "Cherrapunji",
          description: "Full day local waterfall exploration: Nohkalikai Falls, Dainthlen Falls, 3-tiered Wei Sawdong Waterfall, Prut Falls, Lyngksiar Waterfall, and Eco Park. Night stay in Cherrapunji.",
          highlights: [
            "Nohkalikai & Dainthlen Waterfalls",
            "Wei Sawdong 3-tier waterfall hike",
            "Prut Falls & Lyngksiar Waterfall",
            "Eco Park view & Night stay Cherrapunji"
          ]
        },
        {
          day: "Day 03",
          title: "Cherrapunji to Guwahati",
          overnight: "Departure",
          description: "Visit Kynrem Waterfall, Seven Sisters Waterfall, Mawsmai Cave, Arwah Cave, and Bull's Trek. Drive back to Guwahati after sightseeing.",
          highlights: [
            "Kynrem & Seven Sisters Waterfalls",
            "Mawsmai Cave & Arwah Cave walk",
            "Bull's Trek exploration",
            "Return drive to Guwahati"
          ]
        }
      ]
    },
    {
      id: "meghalaya-4d3n",
      title: "4 Days Meghalaya & Mawlynnong Tour",
      price: "Contact Owner",
      duration: "4 Days / 3 Nights",
      image: "/img/mawlynnong/bac 4.png",
      gallery: ["/img/mawlynnong/bac 4.png", "/img/dawki/bac 3.png", "/img/cherrapunji/cerrapunji.png"],
      categories: ["meghalaya", "family"],
      route: "Guwahati → Cherrapunji → Mawlynnong → Guwahati",
      activityLevel: "Moderate Sightseeing",
      groupSize: "2-8 Pax",
      highlights: [
        "Cherrapunji Waterfalls & Cave Circuit",
        "Mawlynnong Cleanest Village in Asia",
        "Living Root Bridge & Dawki River Boating"
      ],
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
          highlights: [
            "Mawlynnong Cleanest Village walk",
            "Single Living Root Bridge hike",
            "Dawki Umngot River boating",
            "Return drive to Guwahati (~5-6 hours)"
          ]
        }
      ]
    },
    {
      id: "meghalaya-5d4n",
      title: "5 Days Meghalaya Full Odyssey",
      price: "Contact Owner",
      duration: "5 Days / 4 Nights",
      image: "/img/dawki/bac 3.png",
      gallery: ["/img/dawki/bac 3.png", "/img/mawlynnong/bac 4.png", "/img/shillong/shillong.png"],
      categories: ["meghalaya", "family", "adventure"],
      route: "Guwahati → Cherrapunji → Upper Shillong → Dawki → Guwahati",
      activityLevel: "Moderate",
      groupSize: "2-8 Pax",
      highlights: [
        "Laitlum Canyon & Living Root Bridge",
        "Dawki Umngot River Boating",
        "Krang Suri & Phe Phe Waterfalls"
      ],
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
          highlights: [
            "Krang Suri blue pool waterfall",
            "Phe Phe Waterfall exploration",
            "Return drive to Guwahati (~5-6 hours)"
          ]
        }
      ]
    },
    {
      id: "meghalaya-6d5n",
      title: "6 Days Meghalaya & Double Decker Root Bridge Trek",
      price: "Contact Owner",
      duration: "6 Days / 5 Nights",
      image: "/img/cherrapunji/bac 1.png",
      gallery: ["/img/cherrapunji/bac 1.png", "/img/dawki/bac 3.png", "/img/shillong/shillong.png"],
      categories: ["meghalaya", "adventure"],
      route: "Guwahati → Cherrapunji → Double Decker Trek → Dawki → Guwahati",
      activityLevel: "Active Trekking",
      groupSize: "2-8 Pax",
      highlights: [
        "Double Decker Living Root Bridge & Rainbow Falls Trek",
        "Laitlum Canyon & Dawki River Boating",
        "Krang Suri & Phe Phe Waterfalls"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Cherrapunji Drive",
          overnight: "Cherrapunji",
          description: "Pickup from Guwahati. Sightseeing includes Umiam Lake, Don Bosco Museum, Shillong Peak, Air Force Museum, Elephant Falls, Mawkdok Valley, and Garden of Caves. Night stay in Cherrapunji.",
          highlights: ["Umiam Lake & Shillong Peak", "Elephant Falls & Mawkdok Valley", "Night stay in Cherrapunji"]
        },
        {
          day: "Day 02",
          title: "Cherrapunji Local Sightseeing",
          overnight: "Cherrapunji",
          description: "Visit Nohkalikai Falls, Dainthlen Falls, Wei Sawdong Waterfall, Prut Falls, Lyngksiar Waterfall, and Eco Park. Night stay in Cherrapunji.",
          highlights: ["Nohkalikai & Wei Sawdong Falls", "Prut & Lyngksiar Waterfalls", "Night stay in Cherrapunji"]
        },
        {
          day: "Day 03",
          title: "Double Decker Living Root Bridge & Rainbow Falls Trek",
          overnight: "Cherrapunji",
          description: "Trek from Tyrna Village down 3,000 steps to the historic Double Decker Living Root Bridge in Nongriat. Continue trekking to majestic Rainbow Falls. Night stay in Cherrapunji.",
          highlights: [
            "Tyrna Village starting point",
            "Double Decker Living Root Bridge hike",
            "Rainbow Falls jungle trek",
            "Natural blue pool swimming & Night stay"
          ]
        },
        {
          day: "Day 04",
          title: "Cherrapunji to Upper Shillong",
          overnight: "Upper Shillong",
          description: "Visit Kynrem Waterfall, Seven Sisters Waterfall, Mawsmai Cave, Arwah Cave, and Bull's Trek. Drive to Upper Shillong for night stay.",
          highlights: ["Kynrem & Seven Sisters Waterfalls", "Mawsmai & Arwah Caves", "Night stay in Upper Shillong"]
        },
        {
          day: "Day 05",
          title: "Upper Shillong to Dawki",
          overnight: "Dawki",
          description: "Visit Laitlum Canyon, Mawlynnong Village, Riwai Living Root Bridge, and enjoy Dawki Umngot river boating. Night stay in Dawki.",
          highlights: ["Laitlum Canyon viewing", "Mawlynnong & Living Root Bridge", "Dawki Boating & Night stay"]
        },
        {
          day: "Day 06",
          title: "Dawki to Guwahati via Krang Suri & Phe Phe",
          overnight: "Departure",
          description: "Visit turquoise Krang Suri Waterfall and Phe Phe Waterfall. Drive back to Guwahati (~5-6 hours).",
          highlights: ["Krang Suri & Phe Phe Waterfalls", "Drive back to Guwahati (~5-6 hours)"]
        }
      ]
    },
    {
      id: "meghalaya-7d6n",
      title: "7 Days Ultimate Meghalaya Explorer",
      price: "Contact Owner",
      duration: "7 Days / 6 Nights",
      image: "/img/shillong/shillong.png",
      gallery: ["/img/shillong/shillong.png", "/img/cherrapunji/bac 1.png", "/img/dawki/bac 3.png"],
      categories: ["meghalaya", "family", "adventure"],
      route: "Guwahati → Upper Shillong → Cherrapunji → Dawki → Guwahati",
      activityLevel: "Moderate / Active",
      groupSize: "2-8 Pax",
      highlights: [
        "Mawphlang Sacred Forest & Laitlum Canyon",
        "Double Decker Root Bridge & Rainbow Falls Trek",
        "Bamboo Trek, Dawki Boating, Krang Suri & Tyrshi Falls"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Upper Shillong",
          overnight: "Upper Shillong",
          description: "Pickup from Guwahati. Visit Umiam Lake, Don Bosco Museum, Shillong Peak, Air Force Museum, Elephant Falls, and ancient Mawphlang Sacred Forest. Night stay in Upper Shillong.",
          highlights: ["Umiam Lake & Shillong Peak", "Elephant Falls & Mawphlang Sacred Forest", "Night stay in Upper Shillong"]
        },
        {
          day: "Day 02",
          title: "Upper Shillong to Cherrapunji via Laitlum",
          overnight: "Cherrapunji",
          description: "Visit Laitlum Canyon, Bull's Trek, Mawkdok Dympep Valley View Point, and Garden of Caves. Night stay in Cherrapunji.",
          highlights: ["Laitlum Canyon gorge view", "Bull's Trek & Mawkdok Valley", "Night stay in Cherrapunji"]
        },
        {
          day: "Day 03",
          title: "Cherrapunji Local Sightseeing",
          overnight: "Cherrapunji",
          description: "Visit Kynrem Waterfall, Bangladesh View Point, Seven Sisters Waterfall, Mawsmai Cave, Arwah Cave, and Eco Park. Night stay in Cherrapunji.",
          highlights: ["Kynrem Falls & Bangladesh View Point", "Seven Sisters Falls & Mawsmai Cave", "Night stay in Cherrapunji"]
        },
        {
          day: "Day 04",
          title: "Double Decker Living Root Bridge & Rainbow Falls Trek",
          overnight: "Cherrapunji",
          description: "Trek through Tyrna Village to Double Decker Living Root Bridge and Rainbow Falls. Night stay in Cherrapunji.",
          highlights: ["Double Decker Root Bridge trek", "Rainbow Falls adventure", "Night stay in Cherrapunji"]
        },
        {
          day: "Day 05",
          title: "Cherrapunji Waterfalls to Upper Shillong",
          overnight: "Upper Shillong",
          description: "Visit Nohkalikai Falls, Dainthlen Falls, Wei Sawdong Waterfall, Prut Falls, and Lyngksiar Waterfall. Drive to Upper Shillong. Night stay in Upper Shillong.",
          highlights: ["Nohkalikai & Wei Sawdong Waterfalls", "Prut & Lyngksiar Falls", "Night stay in Upper Shillong"]
        },
        {
          day: "Day 06",
          title: "Upper Shillong to Dawki via Bamboo Trek",
          overnight: "Dawki",
          description: "Experience the thrilling Bamboo Trek, visit Mawlynnong Village, Riwai Living Root Bridge, and enjoy Dawki Umngot river boating. Night stay in Dawki.",
          highlights: ["Bamboo Trail Skywalk Trek", "Mawlynnong & Living Root Bridge", "Dawki Boating & Night stay"]
        },
        {
          day: "Day 07",
          title: "Dawki to Guwahati via Waterfalls Circuit",
          overnight: "Departure",
          description: "Visit Krang Suri Waterfall, Phe Phe Waterfall, and Tyrshi Waterfall. Drive back to Guwahati (~5-6 hours).",
          highlights: ["Krang Suri, Phe Phe & Tyrshi Waterfalls", "Return drive to Guwahati (~5-6 hours)"]
        }
      ]
    },

    // --- TAWANG / ARUNACHAL PRADESH PACKAGES ---
    {
      id: "tawang-6d5n",
      title: "6 Days Tawang & Sela Pass Express",
      price: "Contact Owner",
      duration: "6 Days / 5 Nights",
      image: "/img/tawang/tawang.png",
      gallery: ["/img/tawang/tawang.png", "/img/tawang/sela_pass.png", "/img/dirang/sangti_valley.png"],
      categories: ["tawang", "adventure"],
      route: "Guwahati → Dirang → Tawang → Bomdila → Guwahati",
      activityLevel: "Mountain High Altitude",
      groupSize: "2-6 Pax",
      highlights: [
        "Kameng River, Tippi Orchid & Nichiphula Waterfall",
        "Sela Pass (13,700 ft), Sela Lake & Nuranang Falls",
        "Bum La Pass (15,200 ft), Madhuri Lake & Tawang Monastery"
      ],
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
    {
      id: "tawang-7d6n",
      title: "7 Days Tawang Circuit & Bhalukpong",
      price: "Contact Owner",
      duration: "7 Days / 6 Nights",
      image: "/img/tawang/sela_pass.png",
      gallery: ["/img/tawang/sela_pass.png", "/img/tawang/tawang.png", "/img/dirang/sangti_valley.png"],
      categories: ["tawang", "family", "adventure"],
      route: "Guwahati → Bhalukpong → Dirang → Tawang → Bomdila → Guwahati",
      activityLevel: "Mountain High Altitude",
      groupSize: "2-8 Pax",
      highlights: [
        "Maha Mrityunjay Temple & Bhalukpong Gateway",
        "Sela Pass, Sela Lake & Jaswant Garh Memorial",
        "Bum La Pass, Madhuri Lake & Tawang Monasteries"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Bhalukpong",
          overnight: "Bhalukpong",
          description: "Drive from Guwahati to Bhalukpong (Approx. 5-6 Hours). Visit Maha Mrityunjay Temple en route. Night stay in Bhalukpong.",
          highlights: ["Maha Mrityunjay Temple visit", "Drive to Bhalukpong (~5-6 hrs)", "Night stay in Bhalukpong"]
        },
        {
          day: "Day 02",
          title: "Bhalukpong to Dirang",
          overnight: "Dirang",
          description: "Drive from Bhalukpong to Dirang (Approx. 5-6 Hours). Sightseeing includes Kameng River, Tippi Orchid Centre, Nichiphula Waterfall, and Nag Mandir. Night stay in Dirang.",
          highlights: ["Kameng River scenic bank", "Tippi Orchid Centre", "Nichiphula Waterfall & Nag Mandir", "Night stay in Dirang"]
        },
        {
          day: "Day 03",
          title: "Dirang to Tawang via Sela Pass",
          overnight: "Tawang",
          description: "Drive to Tawang (Approx. 6-7 Hours). Stop at Sela Pass, Sela Lake, Jaswant Garh War Memorial, and Nuranang Falls. Night stay in Tawang.",
          highlights: ["Sela Pass & Sela Lake", "Jaswant Garh War Memorial", "Nuranang (Jung) Falls", "Night stay in Tawang"]
        },
        {
          day: "Day 04",
          title: "Explore Tawang – Bum La Circuit",
          overnight: "Tawang",
          description: "Full day excursion (8-10 Hours) to Bum La Pass, Pangateng Tso Lake, and Madhuri Lake. Night stay in Tawang.",
          highlights: ["Bum La Pass Indo-China Border", "Pangateng Tso Lake", "Madhuri Lake (Sangetsar Tso)", "Night stay in Tawang"]
        },
        {
          day: "Day 05",
          title: "Explore Tawang Local Sightseeing",
          overnight: "Tawang",
          description: "Visit Tawang Monastery, Giant Buddha Statue, Tawang War Memorial, Khinmey Nyingma Monastery, Ani Gompa, and Ugyenling Monastery. Night stay in Tawang.",
          highlights: ["Tawang Monastery", "Giant Buddha Statue", "Tawang War Memorial", "Night stay in Tawang"]
        },
        {
          day: "Day 06",
          title: "Tawang to Bomdila",
          overnight: "Bomdila",
          description: "Drive to Bomdila (Approx. 7-8 Hours) via Sela Tunnel, Dirang Monastery, and Sangti Valley. Night stay in Bomdila.",
          highlights: ["Sela Tunnel view", "Dirang Monastery & Sangti Valley", "Night stay in Bomdila"]
        },
        {
          day: "Day 07",
          title: "Bomdila to Guwahati Departure",
          overnight: "Departure",
          description: "Visit Bomdila Monastery. Drive back to Guwahati (Approx. 8-9 Hours) for airport/station drop-off.",
          highlights: ["Bomdila Monastery visit", "Return drive to Guwahati (8-9 hrs)", "Guwahati drop-off"]
        }
      ]
    },
    {
      id: "tawang-8d7n",
      title: "8 Days Tawang, Sangti Valley & Shergaon",
      price: "Contact Owner",
      duration: "8 Days / 7 Nights",
      image: "/img/dirang/sangti_valley.png",
      gallery: ["/img/dirang/sangti_valley.png", "/img/tawang/tawang.png", "/img/tawang/sela_pass.png"],
      categories: ["tawang", "adventure"],
      route: "Guwahati → Dirang → Sangti Valley → Tawang → Bomdila → Shergaon → Guwahati",
      activityLevel: "Moderate High Altitude",
      groupSize: "2-8 Pax",
      highlights: [
        "Mandala Top, Sangti Valley & Local Sheep Farm",
        "Sela Pass, Sela Lake & Nyukmadung War Memorial",
        "Bum La Pass, Madhuri Lake & Shergaon Apple Farm"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Dirang",
          overnight: "Dirang",
          description: "Drive from Guwahati to Dirang (8-9 Hours). Visit Tippi Orchidarium, Tenga Valley, Tenga Hat Market, and Nag Mandir. Night stay in Dirang.",
          highlights: ["Tippi Orchidarium & Tenga Valley", "Tenga Hat Market & Nag Mandir", "Night stay in Dirang"]
        },
        {
          day: "Day 02",
          title: "Dirang → Mandala Top → Sangti Valley",
          overnight: "Sangti Valley",
          description: "Explore 108 stupas at Mandala Top, Dirang Monastery, Sangti Valley river banks, Local Sheep Farm, natural Hot Water Spring, and historic Dirang Dzong. Night stay in Sangti Valley.",
          highlights: ["Mandala Top 108 stupas", "Sangti Valley river walk", "Local Sheep Farm & Hot Spring", "Historic Dirang Dzong & Night stay"]
        },
        {
          day: "Day 03",
          title: "Sangti Valley to Tawang",
          overnight: "Tawang",
          description: "Drive to Tawang (~6 Hours). En route visit Nyukmadung War Memorial, Sela Pass, Sela Lake, and Jaswant Garh War Memorial. Night stay in Tawang.",
          highlights: ["Nyukmadung War Memorial", "Sela Pass & Sela Lake", "Jaswant Garh War Memorial", "Night stay in Tawang"]
        },
        {
          day: "Day 04",
          title: "Tawang Local Sightseeing",
          overnight: "Tawang",
          description: "Explore Tawang Monastery, Giant Buddha Statue, Tawang War Memorial, evening Light & Sound Show, and local Tawang market. Night stay in Tawang.",
          highlights: ["Tawang Monastery & Giant Buddha", "Tawang War Memorial Light & Sound", "Local Tawang market shopping", "Night stay in Tawang"]
        },
        {
          day: "Day 05",
          title: "Bum La Pass & High-Altitude Lakes",
          overnight: "Tawang",
          description: "Visit Bum La Pass (Indo-China Border), Madhuri Lake, and P.T. Tso Lake surrounded by pristine Himalayan snowscapes. Night stay in Tawang.",
          highlights: ["Bum La Pass (Subject to Permit)", "Madhuri Lake & P.T. Tso Lake", "Night stay in Tawang"]
        },
        {
          day: "Day 06",
          title: "Tawang → Jung Waterfall → Bomdila",
          overnight: "Bomdila",
          description: "Drive to Bomdila (~6-7 Hours). Stop at Nuranang (Jung) Waterfall, Sela Tunnel, and Bomdila Monastery. Night stay in Bomdila.",
          highlights: ["Nuranang (Jung) Waterfall", "Sela Tunnel pass", "Bomdila Monastery & Night stay"]
        },
        {
          day: "Day 07",
          title: "Bomdila to Shergaon",
          overnight: "Shergaon",
          description: "Drive to Shergaon. Visit Shergaon Apple Farm, Local Craft Centre, Chilipong Monastery, Buddha Heritage Park, and traditional local shops. Night stay in Shergaon.",
          highlights: ["Shergaon Apple Orchards", "Chilipong Monastery & Heritage Park", "Night stay in Shergaon"]
        },
        {
          day: "Day 08",
          title: "Shergaon to Guwahati Departure",
          overnight: "Departure",
          description: "Drive from Shergaon via Bhairabkunda back to Guwahati (~7-8 Hours). Drop-off at Guwahati Airport or Railway Station.",
          highlights: ["Scenic drive via Bhairabkunda", "Return to Guwahati (~7-8 hrs)", "Airport / Station drop-off"]
        }
      ]
    },
    {
      id: "tawang-9d8n",
      title: "9 Days Grand Arunachal & Nameri Wilderness",
      price: "Contact Owner",
      duration: "9 Days / 8 Nights",
      image: "/img/tawang/tawang.png",
      gallery: ["/img/tawang/tawang.png", "/img/dirang/sangti_valley.png", "/img/tawang/sela_pass.png"],
      categories: ["tawang", "family", "adventure"],
      route: "Guwahati → Nameri → Dirang → Sangti Valley → Tawang → Bomdila → Shergaon → Guwahati",
      activityLevel: "Comprehensive Himalayan Tour",
      groupSize: "2-8 Pax",
      highlights: [
        "Nameri National Park & Jia Bhoroli River Walk",
        "Sangti Valley, Mandala Top 108 Stupas & Hot Springs",
        "Full Tawang, Bum La Circuit & Shergaon Apple Orchards"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati → Nameri National Park → Bhalukpong",
          overnight: "Bhalukpong",
          description: "Drive from Guwahati to Nameri National Park (~4.5-5 Hours). Enjoy a guided nature walk along Jia Bhoroli River. Drive to Bhalukpong for night stay.",
          highlights: ["Nameri National Park jungle walk", "Jia Bhoroli River nature scenery", "Night stay in Bhalukpong"]
        },
        {
          day: "Day 02",
          title: "Bhalukpong to Dirang",
          overnight: "Dirang",
          description: "Drive to Dirang (~5 Hours). Visit Tippi Orchidarium, Tenga Valley, Tenga Hat Market, and Nag Mandir. Night stay in Dirang.",
          highlights: ["Tippi Orchidarium", "Tenga Valley & Hat Market", "Nag Mandir & Night stay in Dirang"]
        },
        {
          day: "Day 03",
          title: "Dirang → Mandala Top → Sangti Valley",
          overnight: "Sangti Valley",
          description: "Visit Mandala Top 108 Stupas, Dirang Monastery, Sangti Valley river walk, Sheep Farm, Hot Springs, and historic Dirang Dzong. Night stay in Sangti Valley.",
          highlights: ["Mandala Top stupas", "Sangti Valley river walk & sheep farm", "Hot Water Springs & Night stay"]
        },
        {
          day: "Day 04",
          title: "Sangti Valley to Tawang via Sela Pass",
          overnight: "Tawang",
          description: "Drive to Tawang (~6 Hours). En route visit Nyukmadung War Memorial, Sela Pass, Sela Lake, and Jaswant Garh War Memorial. Night stay in Tawang.",
          highlights: ["Nyukmadung War Memorial", "Sela Pass & Sela Lake", "Jaswant Garh & Night stay Tawang"]
        },
        {
          day: "Day 05",
          title: "Tawang Local Sightseeing",
          overnight: "Tawang",
          description: "Visit Tawang Monastery, Giant Buddha Statue, Tawang War Memorial, evening Light & Sound Show, and local market. Night stay in Tawang.",
          highlights: ["Tawang Monastery & Giant Buddha", "War Memorial Light & Sound Show", "Night stay in Tawang"]
        },
        {
          day: "Day 06",
          title: "Bum La Pass & High-Altitude Lakes",
          overnight: "Tawang",
          description: "Visit Bum La Pass, Madhuri Lake (Sangetsar Tso), and P.T. Tso Lake. Night stay in Tawang.",
          highlights: ["Bum La Pass Indo-China Border", "Madhuri Lake & P.T. Tso Lake", "Night stay in Tawang"]
        },
        {
          day: "Day 07",
          title: "Tawang → Jung Waterfall → Bomdila",
          overnight: "Bomdila",
          description: "Visit Nuranang (Jung) Waterfall, Sela Tunnel, and Bomdila Monastery. Night stay in Bomdila.",
          highlights: ["Nuranang Waterfall", "Sela Tunnel & Bomdila Monastery", "Night stay in Bomdila"]
        },
        {
          day: "Day 08",
          title: "Bomdila to Shergaon",
          overnight: "Shergaon",
          description: "Visit Shergaon Apple Farm, Local Craft Centre, Chilipong Monastery, and Buddha Heritage Park. Night stay in Shergaon.",
          highlights: ["Shergaon Apple Orchards", "Chilipong Monastery", "Night stay in Shergaon"]
        },
        {
          day: "Day 09",
          title: "Shergaon to Guwahati Departure",
          overnight: "Departure",
          description: "Drive back to Guwahati (~7-8 Hours) via Bhairabkunda. Drop-off at Guwahati Airport or Railway Station.",
          highlights: ["Scenic Bhairabkunda highway drive", "Return to Guwahati", "Guwahati Airport / Station drop-off"]
        }
      ]
    },

    // --- ASSAM PACKAGES ---
    {
      id: "guwahati-1day",
      title: "Guwahati Local Sightseeing",
      price: "Contact Owner",
      duration: "1 Day",
      image: "/img/guwahati/guwahati.png",
      gallery: ["/img/guwahati/guwahati.png", "/img/kaziranga/kaziranga_orchid.png"],
      categories: ["assam", "short"],
      route: "Guwahati City Local Circuit",
      activityLevel: "Easy Sightseeing",
      groupSize: "1-8 Pax",
      highlights: [
        "Maa Kamakhya & Umananda Temple",
        "Tirupati Balaji & Basistha Temple",
        "Assam State Zoo & Riverfront Sunset"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Full Day Guwahati City & Temple Sightseeing",
          overnight: "Departure / Guwahati",
          description: "Explore major attractions of Guwahati in one day. Visit Kamakhya Temple atop Nilachal Hill, peacocks at Umananda Temple, Tirupati Balaji Temple, Basistha Temple, Assam State Zoo, and watch the serene Brahmaputra Riverfront sunset.",
          highlights: [
            "Maa Kamakhya Temple darshan",
            "Umananda Temple island boat ride",
            "Tirupati Balaji & Basistha Temple",
            "Assam State Zoo & Riverfront sunset walk"
          ]
        }
      ]
    },
    {
      id: "kaziranga-2d1n",
      title: "Kaziranga Express Wildlife Tour",
      price: "Contact Owner",
      duration: "2 Days / 1 Night",
      image: "/img/kaziranga/kaziranga.png",
      gallery: ["/img/kaziranga/kaziranga.png", "/img/kaziranga/kaziranga_orchid.png", "/img/guwahati/guwahati.png"],
      categories: ["assam", "short"],
      route: "Guwahati - Kaziranga - Guwahati",
      activityLevel: "Moderate Wildlife",
      groupSize: "2-6 Pax",
      highlights: [
        "Maha Mrityunjay Temple Visit",
        "Kaziranga Orchid & Biodiversity Park",
        "Early Morning Elephant / Jeep Safari"
      ],
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
    },
    {
      id: "kaziranga-3d2n",
      title: "Kaziranga Safari & Cultural Experience",
      price: "Contact Owner",
      duration: "3 Days / 2 Nights",
      image: "/img/kaziranga/kaziranga_orchid.png",
      gallery: ["/img/kaziranga/kaziranga_orchid.png", "/img/kaziranga/kaziranga.png", "/img/guwahati/guwahati.png"],
      categories: ["assam", "family"],
      route: "Guwahati - Kaziranga - Guwahati",
      activityLevel: "Easy / Family Friendly",
      groupSize: "2-8 Pax",
      highlights: [
        "Guwahati Pickup & Kamakhya Temple",
        "Dual Safaris: Elephant & Evening Jeep Safari",
        "Assam Tea Gardens & Kaziranga View Point"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati Pickup & Drive to Kaziranga",
          overnight: "Kaziranga",
          description: "Pickup from Guwahati Airport/Station. Visit Kamakhya Temple & Umananda Temple. Drive to Kaziranga.",
          highlights: ["Guwahati pickup", "Kamakhya & Umananda Temples", "Drive to Kaziranga & Night stay"]
        },
        {
          day: "Day 02",
          title: "Kaziranga Dual Safaris & Cultural Show",
          overnight: "Kaziranga",
          description: "Pre-dawn Elephant Safari & evening 4x4 Jeep Safari. Assamese cultural dance show at Orchid Park.",
          highlights: ["Elephant Safari", "Jeep Safari", "Orchid Park Cultural Show"]
        },
        {
          day: "Day 03",
          title: "Tea Gardens, Kaziranga View Point & Drop",
          overnight: "Departure",
          description: "Drive to Guwahati via Maha Mrityunjay Temple, Tea Gardens, and Kaziranga View Point. Drop-off at Guwahati.",
          highlights: ["Maha Mrityunjay Temple", "Assam Tea Gardens walk", "Kaziranga View Point", "Guwahati drop-off"]
        }
      ]
    },
    {
      id: "assam-5d4n",
      title: "Assam Tour: Kaziranga & Umrangso",
      price: "Contact Owner",
      duration: "5 Days / 4 Nights",
      image: "/img/umrangso/umrangso.png",
      gallery: ["/img/umrangso/umrangso.png", "/img/panimur/panimur.png", "/img/kaziranga/kaziranga.png"],
      categories: ["assam", "adventure"],
      route: "Guwahati - Kaziranga - Umrangso - Guwahati",
      activityLevel: "Moderate Scenic",
      groupSize: "2-8 Pax",
      highlights: [
        "Kaziranga Elephant & Jeep Safaris",
        "Panimur Waterfall (Niagara of Assam)",
        "Umrangso Golf Field, Pushringdi Island & Dam"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Kaziranga Drive",
          overnight: "Kaziranga",
          description: "Pickup from Guwahati (~230 km). Visit Maha Mrityunjay Temple en route.",
          highlights: ["Guwahati pickup", "Maha Mrityunjay Temple", "Night stay Kaziranga"]
        },
        {
          day: "Day 02",
          title: "Kaziranga National Park Safaris",
          overnight: "Kaziranga",
          description: "Early Elephant Safari & evening Jeep Safari. Cultural programme at Orchid Park.",
          highlights: ["Elephant Safari", "Jeep Safari", "Cultural show at Orchid Park"]
        },
        {
          day: "Day 03",
          title: "Kaziranga to Umrangso & Panimur Waterfall",
          overnight: "Umrangso",
          description: "Drive to Umrangso (~255 km). Stop at Panimur Waterfall on Kopili River.",
          highlights: ["Drive to Umrangso (~255 km)", "Panimur Waterfall visit", "Night stay Umrangso"]
        },
        {
          day: "Day 04",
          title: "Umrangso Local Sightseeing",
          overnight: "Umrangso",
          description: "Explore Umrangso Golf Field, Pushringdi Island, Tularam Cave, and Umrang Dam.",
          highlights: ["Umrangso Golf Field", "Pushringdi Island", "Tularam Cave", "Umrang Dam"]
        },
        {
          day: "Day 05",
          title: "Umrangso to Guwahati & Miyugma Waterfall",
          overnight: "Departure",
          description: "Drive back to Guwahati (~260 km). Visit Miyugma Daogah Waterfall. Drop-off at Guwahati.",
          highlights: ["Miyugma Daogah Waterfall", "Return to Guwahati (~260 km)", "Airport / Station drop"]
        }
      ]
    },
    {
      id: "assam-6d5n",
      title: "Grand Assam Tour: Guwahati, Kaziranga & Umrangso",
      price: "Contact Owner",
      duration: "6 Days / 5 Nights",
      image: "/img/panimur/panimur.png",
      gallery: ["/img/panimur/panimur.png", "/img/umrangso/umrangso.png", "/img/guwahati/guwahati.png", "/img/kaziranga/kaziranga.png"],
      categories: ["assam", "family", "adventure"],
      route: "Guwahati - Kaziranga - Umrangso - Guwahati",
      activityLevel: "Easy / Moderate",
      groupSize: "2-8 Pax",
      highlights: [
        "Guwahati Full Day City & Temple Tour",
        "Kaziranga Dual Safaris & Orchid Culture",
        "Panimur Waterfall & Umrangso Golf Field",
        "Miyugma Daogah Waterfall"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati Local Sightseeing",
          overnight: "Guwahati",
          description: "Pickup from Guwahati. Sightseeing: Kamakhya, Umananda, Balaji, Basistha, Zoo & Riverfront. Night stay Guwahati.",
          highlights: ["Kamakhya & Umananda", "Balaji & Basistha Temples", "Zoo & Riverfront sunset"]
        },
        {
          day: "Day 02",
          title: "Guwahati to Kaziranga",
          overnight: "Kaziranga",
          description: "Drive towards Kaziranga (~230 km). Visit Maha Mrityunjay Temple en route.",
          highlights: ["Drive to Kaziranga (~230 km)", "Maha Mrityunjay Temple", "Night stay Kaziranga"]
        },
        {
          day: "Day 03",
          title: "Kaziranga National Park Safaris",
          overnight: "Kaziranga",
          description: "Elephant Safari & Jeep Safari. Cultural dance performance at Orchid Park.",
          highlights: ["Elephant Safari", "Jeep Safari", "Orchid Park Cultural Show"]
        },
        {
          day: "Day 04",
          title: "Kaziranga to Umrangso & Panimur Waterfall",
          overnight: "Umrangso",
          description: "Drive to Umrangso (~255 km). Visit Panimur Waterfall Kopili river rapids.",
          highlights: ["Panimur Waterfall visit", "Dima Hasao hill drive", "Night stay Umrangso"]
        },
        {
          day: "Day 05",
          title: "Umrangso Local Sightseeing",
          overnight: "Umrangso",
          description: "Full day sightseeing: Umrangso Golf Field, Pushringdi Island, Tularam Cave, Umrang Dam.",
          highlights: ["Umrangso Golf Field", "Pushringdi Island", "Tularam Cave", "Umrang Dam"]
        },
        {
          day: "Day 06",
          title: "Umrangso to Guwahati & Departure",
          overnight: "Departure",
          description: "Drive back to Guwahati (~260 km). Visit Miyugma Daogah Waterfall. Drop-off at Guwahati.",
          highlights: ["Miyugma Daogah Waterfall", "Return drive to Guwahati (~260 km)", "Airport / Station drop"]
        }
      ]
    }
  ];

  const packages = cmsPackages.length > 0
    ? [...cmsPackages, ...defaultPackages.filter(dp => !cmsPackages.some(cp => cp.id === dp.id))]
    : defaultPackages;

  // Destination Data
  const defaultDestinations = [
    {
      id: "tawang",
      num: "01",
      name: "Tawang & Sela Pass",
      state: "Arunachal Pradesh",
      duration: "4-6 Days",
      image: "/img/tawang/tawang.png",
      desc: "Sacred land of Himalayan monasteries, frozen Sela Lake (13,700 ft), Bum La Pass (15,200 ft), Madhuri Lake & Sela Tunnel.",
      spanClass: "md:col-span-8"
    },
    {
      id: "sangti_valley",
      num: "02",
      name: "Sangti Valley & Dirang",
      state: "Arunachal Pradesh",
      duration: "2 Days",
      image: "/img/dirang/sangti_valley.png",
      desc: "Idyllic mountain valley in Dirang with local sheep farm, natural hot water springs, Mandala Top 108 stupas & fruit orchards.",
      spanClass: "md:col-span-4 md:mt-12"
    },
    {
      id: "cherrapunji",
      num: "03",
      name: "Cherrapunji & Root Bridges",
      state: "Meghalaya",
      duration: "3-4 Days",
      image: "/img/cherrapunji/cerrapunji.png",
      desc: "Land of massive waterfalls (Nohkalikai, Wei Sawdong), Double Decker Living Root Bridge hike & limestone cave systems.",
      spanClass: "md:col-span-6"
    },
    {
      id: "dawki",
      num: "04",
      name: "Dawki & Mawlynnong",
      state: "Meghalaya",
      duration: "1-2 Days",
      image: "/img/dawki/bac 3.png",
      desc: "Transparent boating on Umngot River, Asia's Cleanest Village Mawlynnong, Bamboo Skywalk Trek & Krang Suri blue pools.",
      spanClass: "md:col-span-6"
    },
    {
      id: "kaziranga",
      num: "05",
      name: "Kaziranga National Park",
      state: "Assam",
      duration: "2-3 Days",
      image: "/img/kaziranga/kaziranga.png",
      desc: "UNESCO World Heritage Site, home of the One-Horned Rhinoceros, Elephant & Jeep Safaris, Assam Tea Estates & Orchid Park.",
      spanClass: "md:col-span-6"
    },
    {
      id: "guwahati",
      num: "06",
      name: "Maa Kamakhya & Guwahati",
      state: "Assam",
      duration: "1-2 Days",
      image: "/img/guwahati/guwahati.png",
      desc: "Sacred Maa Kamakhya Temple atop Nilachal Hill, peacocks at Umananda Island Temple, and Brahmaputra Riverfront Sunset Cruise.",
      spanClass: "md:col-span-6"
    },
    {
      id: "umrangso",
      num: "07",
      name: "Umrangso & Panimur Falls",
      state: "Assam (Dima Hasao)",
      duration: "2 Days",
      image: "/img/umrangso/umrangso.png",
      desc: "Umrangso Golf Field, Pushringdi Island, Tularam Cave, Umrang Dam, and Panimur Waterfall ('Niagara of Assam').",
      spanClass: "md:col-span-12 md:-mt-4"
    }
  ];

  const destinations = cmsPlaces.length > 0
    ? cmsPlaces.map((p, idx) => ({
        id: p.id || p._id,
        num: `0${idx + 1}`.slice(-2),
        name: p.name,
        state: "Northeast India",
        duration: p.travelTime || "Custom",
        image: p.image || "/img/cherrapunji/cerrapunji.png",
        desc: p.description || p.query || "",
        spanClass: idx % 3 === 0 ? "md:col-span-8" : idx % 3 === 1 ? "md:col-span-4" : "md:col-span-6"
      }))
    : defaultDestinations;

  const filteredPackages = packages.filter((pkg) => {
    const matchesRegion =
      activeRegion === "all" ? true : pkg.categories.includes(activeRegion);

    if (!matchesRegion) return false;

    if (durationFilter === "all") return true;

    const match = pkg.duration.match(/(\d+)\s*Days?/i);
    const numDays = match ? parseInt(match[1], 10) : 1;

    if (durationFilter === "short") return numDays <= 3;
    if (durationFilter === "medium") return numDays >= 4 && numDays <= 5;
    if (durationFilter === "grand") return numDays >= 6;

    return true;
  });

  const regionTabs = [
    {
      id: "meghalaya",
      title: "Meghalaya Tours",
      subtitle: "Waterfalls, Root Bridges & Canyons",
      badgeText: `${packages.filter((p) => p.categories.includes("meghalaya")).length} Packages`,
      icon: Trees,
      coverImg: "/img/cherrapunji/cerrapunji.png",
      tagline: "The Abode of Clouds"
    },
    {
      id: "assam",
      title: "Assam Tours",
      subtitle: "Kaziranga Safaris & Umrangso",
      badgeText: `${packages.filter((p) => p.categories.includes("assam")).length} Packages`,
      icon: Compass,
      coverImg: "/img/kaziranga/kaziranga.png",
      tagline: "Rhinos & Tea Estates"
    },
    {
      id: "tawang",
      title: "Arunachal & Tawang",
      subtitle: "Sela Pass, Monasteries & Lakes",
      badgeText: `${packages.filter((p) => p.categories.includes("tawang")).length} Packages`,
      icon: Mountain,
      coverImg: "/img/tawang/tawang.png",
      tagline: "Dawn-Lit Mountains"
    },
    {
      id: "all",
      title: "All Northeast",
      subtitle: "Explore Complete Circuits",
      badgeText: `${packages.length} Packages`,
      icon: MapPin,
      coverImg: "/img/guwahati/guwahati.png",
      tagline: "Full Exploration"
    }
  ];

  const durationTabs = [
    { label: "All Durations", value: "all" },
    { label: "1-3 Days (Short)", value: "short" },
    { label: "4-5 Days (Medium)", value: "medium" },
    { label: "6+ Days (Grand)", value: "grand" }
  ];

  // Custom Trip Form Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = true;
      isValid = false;
    }
    if (!contactInfo.trim()) {
      newErrors.contactInfo = true;
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      if (formRef.current) {
        formRef.current.animate([
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(0)" }
        ], { duration: 300 });
      }
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);

      const phoneNumber = "917002674473";
      const customMessage = `Hi Borah Tours & Travel, I have submitted a customized trip enquiry:
- Name: ${fullName}
- Contact: ${contactInfo}
- Tentative Dates: ${travelDates || "Flexible"}
- Number of Travelers: ${travelers || "Not specified"}
- Special Requirements: ${requirements || "None"}`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(customMessage)}`;
      window.open(whatsappUrl, "_blank");

      setTimeout(() => {
        setSuccess(false);
        setFullName("");
        setContactInfo("");
        setTravelDates("");
        setTravelers("");
        setRequirements("");
      }, 3000);
    }, 1200);
  };

  const openWizard = (pkgTitle?: string) => {
    setWizardPackageTitle(pkgTitle || "");
    setIsWizardOpen(true);
  };

  return (
    <div className="flex flex-col w-full relative font-manrope">

      {/* 1. Hero Section - Styled from guide/3.txt & guide/6.txt */}
      {/* 1. Hero Section */}
      <section id="home" className="relative pt-16 sm:pt-28 pb-8 sm:pb-16 bg-[#f7f8f4] overflow-hidden px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(#1e4630 0.75px, transparent 0.75px)",
            backgroundSize: "24px 24px"
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start mb-4 sm:mb-6">
            <div className="lg:col-span-8 flex flex-col pt-1 sm:pt-2">
              {/* <div className="inline-flex items-center gap-1.5 bg-[#1e4630]/10 text-[#1e4630] px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold mb-3 border border-[#1e4630]/15 self-start">
                <Sparkles size={13} className="text-[#1e4630]" />
                <span>Private Guwahati Airport Pickups</span>
              </div> */}
              <h1 className="text-3xl sm:text-5xl md:text-5xl font-display-lg text-[#1c1716] font-semibold tracking-tight leading-[1.15] mb-2.5">
                {cmsSettings?.heroTitle || "A new way to live with Nature"}
              </h1>
              <p className="text-xs sm:text-base md:text-lg text-[#1c1716]/80 font-normal leading-relaxed max-w-2xl">
                {cmsSettings?.heroSubtitle || "We redesigned how travelers connect with nature, explore hidden waterfalls, and experience Assamese & NorthEast culture all in one customized private tour service."}
              </p>
            </div>
          </div>

          {/* SVG Masked Hero Visual Container */}
          <div className="relative w-full md:-mt-20 rounded-2xl sm:rounded-3xl overflow-hidden group ">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "1213/667",
                maskImage:
                  "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
                WebkitMaskImage:
                  "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
            >
              {heroVideos.map((vid, idx) => {
                const isActive = idx === currentVideoIndex;
                return (
                  <video
                    key={vid.src}
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    preload="auto"
                    muted
                    playsInline
                    onEnded={isActive ? handleHeroVideoEnd : undefined}
                    onTimeUpdate={isActive ? handleVideoTimeUpdate : undefined}
                    className={`absolute object-cover transition-opacity duration-700 ease-in-out ${isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                      } ${vid.rotate
                        ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
                        : "top-0 left-0 w-full h-full"
                      }`}
                    style={
                      vid.rotate
                        ? {
                          width: "calc(100% * 667 / 1213)",
                          height: "calc(100% * 1213 / 667)",
                        }
                        : {}
                    }
                  >
                    <source src={vid.src} type="video/mp4" />
                  </video>
                );
              })}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-10"></div>

              {/* Mobile-Optimized Story-Style Video Playlist Indicators */}
              <div className="absolute top-3 left-4 right-4 sm:top-4 sm:left-6 sm:right-6 flex items-center gap-2 z-20">
                {heroVideos.map((vid, idx) => (
                  <button
                    key={vid.src}
                    onClick={() => setCurrentVideoIndex(idx)}
                    aria-label={`Switch to video ${idx + 1}`}
                    className="flex-1 py-2.5 -my-2.5 focus:outline-none cursor-pointer group"
                  >
                    <div
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${currentVideoIndex === idx
                        ? "bg-[#c6f022] shadow-[0_0_10px_rgba(198,240,34,0.8)]"
                        : "bg-white/35 group-hover:bg-white/60"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Floating CTA Card (Bottom Left) */}
            <div className="hidden sm:block absolute bottom-6 left-6 bg-white p-5 rounded-3xl  max-w-[290px] z-20 border border-black/5">
              <span className="text-[11px] font-semibold text-[#1e4630] uppercase tracking-wider block mb-1.5">
                250+ Happy Travelers Joined
              </span>

              <div className="flex items-center -space-x-2 mb-3">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Explorer" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Explorer" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Explorer" />
              </div>

              <h4 className="text-base font-bold text-[#1c1716] leading-tight mb-3">
                Join the Future of Smart Travel
              </h4>

              <button
                onClick={() => openWizard()}
                className="btn-hover inline-flex items-center justify-center w-full bg-[#1e4630] hover:bg-[#143624] text-[#c6f022] text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
              >
                Plan Your Private Tour
              </button>
            </div>

            {/* Desktop Floating Explore Button (Bottom Right) */}
            <div className="hidden sm:flex absolute bottom-6 right-6 items-center gap-3 z-20">
              <a
                href="#packages"
                className="btn-hover bg-[#c6f022] text-[#1e4630] text-xs font-bold px-6 py-3 rounded-2xl shadow-lg decoration-none flex items-center gap-2"
              >
                <span>Explore Packages</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Mobile Hero Action Buttons (Clean & High Converting Below Video) */}
          <div className="flex sm:hidden flex-col gap-2.5 mt-4">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => openWizard()}
                className="btn-hover bg-[#1e4630] text-[#c6f022] text-xs font-bold py-3 px-3 rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {/* <Sparkles size={14} /> */}
                <span>Custom Plan</span>
              </button>

              <a
                href="#packages"
                className="btn-hover bg-[#c6f022] text-[#1e4630] text-xs font-bold py-3 px-3 rounded-xl shadow-md decoration-none flex items-center justify-center gap-1.5 text-center"
              >
                <span>Browse Trips</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Counter Section */}
      <section className="w-full py-10 sm:py-16 bg-[#ffffff] border-y border-gray-100 font-manrope">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-[90px] items-start justify-center relative w-full max-w-[1200px] mx-auto px-4 sm:px-6">

          <div className="bg-[#f7f8f4] sm:bg-transparent p-3.5 sm:p-0 rounded-2xl sm:rounded-none flex flex-col gap-1 sm:gap-3 items-center lg:items-start text-center lg:text-left border border-gray-100 sm:border-none">
            <p className="font-bold leading-none text-[#1c1716] text-[28px] sm:text-[40px] md:text-[48px] tracking-tight">
              98%
            </p>
            <div className="flex flex-col gap-0.5 text-[#1c1716]">
              <p className="font-semibold text-xs sm:text-[18px] md:text-[20px]">
                5-Star Ratings
              </p>
              <p className="font-normal text-xs text-gray-600 leading-snug hidden sm:block">
                Helping travelers navigate living root bridges, canyons, and waterfalls seamlessly.
              </p>
            </div>
          </div>

          <div className="bg-[#f7f8f4] sm:bg-transparent p-3.5 sm:p-0 rounded-2xl sm:rounded-none flex flex-col gap-1 sm:gap-3 items-center lg:items-start text-center lg:text-left border border-gray-100 sm:border-none">
            <p className="font-bold leading-none text-[#1c1716] text-[28px] sm:text-[40px] md:text-[48px] tracking-tight">
              150+
            </p>
            <div className="flex flex-col gap-0.5 text-[#1c1716]">
              <p className="font-semibold text-xs sm:text-[18px] md:text-[20px]">
                Private Tours
              </p>
              <p className="font-normal text-xs text-gray-600 leading-snug hidden sm:block">
                Enabling family vacations and adventurous road trips across Meghalaya &amp; Assam.
              </p>
            </div>
          </div>

          <div className="bg-[#f7f8f4] sm:bg-transparent p-3.5 sm:p-0 rounded-2xl sm:rounded-none flex flex-col gap-1 sm:gap-3 items-center lg:items-start text-center lg:text-left border border-gray-100 sm:border-none">
            <p className="font-bold leading-none text-[#1c1716] text-[28px] sm:text-[40px] md:text-[48px] tracking-tight">
              100%
            </p>
            <div className="flex flex-col gap-0.5 text-[#1c1716]">
              <p className="font-semibold text-xs sm:text-[18px] md:text-[20px]">
                Local Expert Drivers
              </p>
              <p className="font-normal text-xs text-gray-600 leading-snug hidden sm:block">
                Travel with trusted local drivers who know every hidden gem and secret trail.
              </p>
            </div>
          </div>

          <div className="bg-[#f7f8f4] sm:bg-transparent p-3.5 sm:p-0 rounded-2xl sm:rounded-none flex flex-col gap-1 sm:gap-3 items-center lg:items-start text-center lg:text-left border border-gray-100 sm:border-none">
            <p className="font-bold leading-none text-[#1c1716] text-[28px] sm:text-[40px] md:text-[48px] tracking-tight">
              85%
            </p>
            <div className="flex flex-col gap-0.5 text-[#1c1716]">
              <p className="font-semibold text-xs sm:text-[18px] md:text-[20px]">
                More Custom Value
              </p>
              <p className="font-normal text-xs text-gray-600 leading-snug hidden sm:block">
                No middleman markup. Direct coordination with local homestays and private vehicles.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Feature Section 02 - Adapted from guide/3.txt `ne` component */}
     

      

      {/* 5. Curated Destinations Bento Grid */}
      <section id="destinations" className="w-full bg-[#f7f8f4] py-10 sm:py-20 px-4 sm:px-6 relative border-t border-gray-200/60">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] mb-1 block">
                Iconic Locations
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">Curated Destinations</h2>
              <p className="text-gray-600 max-w-xl mt-1.5 text-xs sm:text-base">
                Explore our handpicked selection of must-visit locations across NorthEast.
              </p>
            </div>
          </div>

          {/* Mobile Subtitle */}
          <div className="block md:hidden mb-3 text-xs font-bold text-[#1e4630] uppercase tracking-wider">
            <span>Must-Visit Places</span>
          </div>

          {/* Responsive Layout: Mobile Vertical Grid / Desktop Bento Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
            {destinations.map((dest) => (
              <article
                key={dest.id}
                className={`w-full ${dest.spanClass} group relative rounded-2xl sm:rounded-3xl overflow-hidden h-64 sm:h-96 md:h-[420px] shadow-md sm:shadow-lg border border-black/5`}
              >
                <img
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={dest.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div className="bg-[#c6f022] text-[#1e4630] font-bold text-[11px] sm:text-xs px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-sm">
                    {dest.duration}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-5 sm:p-8 flex flex-col gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#c6f022] text-xl sm:text-3xl font-bold opacity-70">
                      {dest.num}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-bold text-white">
                      {dest.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 leading-relaxed">
                    {dest.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Live Google Maps Integration Section */}
          <div className="mt-16 pt-10 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8">
              <div>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#1c1716] tracking-tight">
                  Explore Tour Destinations on Google Maps
                </h3>
                <p className="text-sm text-gray-600 max-w-xl mt-2 leading-relaxed">
                  Click any location below to view interactive Google Maps directions, driving estimates, and highlights starting from Guwahati Airport.
                </p>
              </div>

              {/* External Google Maps App Link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedMap.query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover inline-flex items-center gap-2 bg-[#1e4630] text-[#c6f022] hover:bg-[#143624] text-xs font-bold px-5 py-3 rounded-2xl shadow-md transition-colors cursor-pointer shrink-0"
              >
                <span>Open in Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Destination Selection Chips */}
            <div className="flex overflow-x-auto gap-2.5 mb-6 pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
              {mapLocations.map((loc) => {
                const isActive = activeMapId === loc.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveMapId(loc.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border shrink-0 ${isActive
                      ? "bg-[#1e4630] text-[#c6f022] border-[#1e4630] shadow-md scale-105"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                  >
                    <MapPin size={13} className={isActive ? "text-[#c6f022]" : "text-[#1e4630]"} />
                    <span>{loc.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Google Maps Embed & Info Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Destination Detail Info Card */}
              <div className="lg:col-span-4 bg-white border border-gray-200/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg flex flex-col justify-between space-y-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1e4630] uppercase tracking-wider mb-2">
                    <MapPin size={14} className="text-[#1e4630]" />
                    <span>{selectedMap.name}</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#1c1716] leading-tight mb-2.5">
                    {selectedMap.query}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                    {selectedMap.description}
                  </p>

                  <div className="space-y-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-500 font-medium flex items-center gap-2">
                        <Car size={15} className="text-[#1e4630]" /> Distance:
                      </span>
                      <span className="font-bold text-[#1c1716]">{selectedMap.distance}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-500 font-medium flex items-center gap-2">
                        <Clock size={15} className="text-[#1e4630]" /> Drive Time:
                      </span>
                      <span className="font-bold text-[#1c1716]">{selectedMap.travelTime}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openWizard(selectedMap.name)}
                  className="btn-hover w-full bg-[#c6f022] text-[#1e4630] font-bold text-xs sm:text-sm py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
                >
                  <span>Plan Private Tour ({selectedMap.name})</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Google Maps iFrame */}
              <div className="lg:col-span-8 h-[300px] sm:h-[460px] min-h-[260px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border border-black/5 relative bg-gray-100">
                <iframe
                  title={`Google Maps - ${selectedMap.name}`}
                  src={selectedMap.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full rounded-2xl sm:rounded-3xl"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Car Rates List Section */}
      <CarRatesSection />

      {/* Available Vehicles Fleet Section */}
      <VehicleFleetSection />

      {/* 6. Master Organized Tour Packages Section */}
      <section id="packages" className="py-12 sm:py-24 bg-[#f8faf6] border-t border-gray-200/80 font-manrope">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2">

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#1c1716] tracking-tight">
              Select Your Travel State
            </h2>
            <p className="text-xs sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
              Browse our itineraries organized by region. Tap a state card below to filter packages effortlessly.
            </p>
          </div>

          {/* MASTER REGION SELECTOR - DESKTOP (4-Col Cards) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {regionTabs.map((region) => {
              const isActive = activeRegion === region.id;
              const IconComp = region.icon;

              return (
                <button
                  key={region.id}
                  onClick={() => {
                    setActiveRegion(region.id);
                    setDurationFilter("all");
                  }}
                  className={`group relative flex flex-col justify-between p-5 rounded-3xl transition-all duration-300 text-left cursor-pointer overflow-hidden border ${isActive
                    ? "bg-[#1e4630] text-white border-[#c6f022] shadow-xl scale-[1.02] ring-2 ring-[#c6f022]/40"
                    : "bg-white text-[#1c1716] border-gray-200/90 hover:border-[#1e4630]/50 hover:shadow-md"
                    }`}
                >
                  {/* Subtle Background Cover Image Tint for active card */}
                  {isActive && (
                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                      <img src={region.coverImg} alt={region.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e4630] via-[#1e4630]/80 to-transparent"></div>
                    </div>
                  )}

                  <div className="relative z-10 space-y-2">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`p-2 rounded-xl text-sm font-bold flex items-center justify-center ${isActive ? "bg-[#c6f022] text-[#1e4630]" : "bg-[#f7f8f4] text-[#1e4630] group-hover:bg-[#1e4630] group-hover:text-[#c6f022] transition-colors"
                        }`}>
                        <IconComp size={18} />
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${isActive ? "bg-white/20 text-[#c6f022] border-[#c6f022]/30" : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}>
                        {region.badgeText}
                      </span>
                    </div>

                    <div>
                      <h3 className={`text-lg font-bold leading-tight ${isActive ? "text-white" : "text-[#1c1716]"}`}>
                        {region.title}
                      </h3>
                      <p className={`text-xs mt-0.5 line-clamp-1 ${isActive ? "text-gray-200" : "text-gray-500"}`}>
                        {region.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                    <span className={isActive ? "text-[#c6f022]" : "text-gray-400"}>
                      {region.tagline}
                    </span>
                    <ChevronRight size={14} className={`transition-transform ${isActive ? "text-[#c6f022] translate-x-0.5" : "text-gray-400"}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* MASTER REGION SELECTOR - MOBILE (Sleek Segmented Pill Bar) */}
          <div className="block md:hidden mb-4">
            <div className="flex overflow-x-auto gap-2 no-scrollbar pb-2 -mx-4 px-4">
              {regionTabs.map((region) => {
                const isActive = activeRegion === region.id;
                const IconComp = region.icon;
                return (
                  <button
                    key={region.id}
                    onClick={() => {
                      setActiveRegion(region.id);
                      setDurationFilter("all");
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer border ${isActive
                      ? "bg-[#1e4630] text-[#c6f022] border-[#1e4630] shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                  >
                    <IconComp size={15} className={isActive ? "text-[#c6f022]" : "text-[#1e4630]"} />
                    <span>{region.title.replace(" Tours", "")}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-[#c6f022]/20 text-[#c6f022]" : "bg-gray-100 text-gray-500"
                      }`}>
                      {packages.filter((p) => region.id === "all" || p.categories.includes(region.id)).length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DURATION & STYLE SUB-FILTER BAR */}
          <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-gray-200/80 shadow-sm mb-6 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-3">

            {/* Active Region Indicator */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1c1716] self-start md:self-auto">
              <Filter size={14} className="text-[#1e4630]" />
              <span>
                {activeRegion === "all" ? "All Northeast" : activeRegion.toUpperCase()} Trips:
              </span>
              <span className="bg-[#1e4630]/10 text-[#1e4630] px-2.5 py-0.5 rounded-full text-xs font-bold">
                {filteredPackages.length} Available
              </span>
            </div>

            {/* Duration Pills */}
            <div className="flex overflow-x-auto gap-1.5 sm:gap-2 w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
              {durationTabs.map((dt) => {
                const isSelected = durationFilter === dt.value;
                return (
                  <button
                    key={dt.value}
                    onClick={() => setDurationFilter(dt.value)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${isSelected
                      ? "bg-[#1e4630] text-[#c6f022] shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200/70"
                      }`}
                  >
                    {dt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PACKAGES CARDS RESPONSIVE GRID */}
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {filteredPackages.map((pkg) => {
                const waMessage = `Hi Borah Tours & Travel! I am interested in booking the private tour package:
- *Package:* ${pkg.title}
- *Duration:* ${pkg.duration}
- *Route:* ${pkg.route}

Please share direct owner quote and booking details!`;
                const waLink = `https://wa.me/917002674473?text=${encodeURIComponent(waMessage)}`;

                // Determine region tag badge
                const isMeghalaya = pkg.categories.includes("meghalaya");
                const isAssam = pkg.categories.includes("assam");
                const isTawang = pkg.categories.includes("tawang");

                const regionBadgeLabel = isMeghalaya
                  ? "🌿 MEGHALAYA"
                  : isTawang
                    ? "🏔️ ARUNACHAL"
                    : isAssam
                      ? "🦏 ASSAM"
                      : "✨ NORTHEAST";

                return (
                  <article
                    key={pkg.id}
                    className="w-full group relative flex flex-col bg-white border border-gray-200/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Header Image */}
                    <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-[#1e4630]">
                      <img
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={pkg.title}
                        src={pkg.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                      {/* Region Tag Badge (Top Left) */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-black/50 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                        {regionBadgeLabel}
                      </div>

                      {/* Contact Direct Badge (Top Right) */}
                      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#c6f022] text-[#1e4630] px-3 py-1 rounded-full font-bold text-[10px] sm:text-xs uppercase shadow-md flex items-center gap-1">
                        <Phone size={11} />
                        <span>Contact Direct</span>
                      </div>

                      {/* Duration & Group Size Pills (Bottom Left) */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                        <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px]">
                          <Clock size={13} className="text-[#c6f022]" />
                          {pkg.duration}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                          <Users size={13} className="text-[#c6f022]" />
                          {pkg.groupSize}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-6 flex flex-col flex-grow space-y-3.5">

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-[#1c1716] leading-snug line-clamp-2 group-hover:text-[#1e4630] transition-colors">
                        {pkg.title}
                      </h3>

                      {/* Route flow */}
                      <div className="bg-[#f7f8f4] p-2.5 rounded-xl border border-gray-100 flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <MapPin size={14} className="text-[#1e4630] shrink-0" />
                        <span className="line-clamp-1">{pkg.route}</span>
                      </div>

                      {/* Highlights list */}
                      <div className="space-y-1 flex-grow">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Trip Highlights
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1 pl-0 list-none mb-0">
                          {pkg.highlights.slice(0, 3).map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle size={13} className="text-[#1e4630] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTAs */}
                      <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDetailPackage(pkg)}
                          className="btn-hover flex-grow py-2.5 bg-white text-[#1e4630] text-center font-bold text-xs uppercase tracking-wider rounded-xl border border-gray-300 hover:bg-[#1e4630] hover:text-[#c6f022] transition-all cursor-pointer shadow-sm"
                        >
                          View Itinerary
                        </button>

                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-hover flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#c6f022] text-[#1e4630] text-xs font-bold rounded-xl shadow-md cursor-pointer decoration-none"
                          title="Contact Owner via WhatsApp"
                        >
                          <MessageSquare size={16} />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-gray-200 max-w-lg mx-auto space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-[#1e4630]/10 text-[#1e4630] flex items-center justify-center mx-auto">
                <Compass size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1c1716]">No Exact Matches Found</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We don&apos;t have a preset tour matching this exact duration filter right now, but we specialize in custom itineraries!
              </p>
              <button
                onClick={() => {
                  setActiveRegion("all");
                  setDurationFilter("all");
                }}
                className="btn-hover inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1e4630] text-[#c6f022] font-bold text-xs cursor-pointer shadow-md"
              >
                <span>Reset Filters</span>
              </button>
            </div>
          )}

        </div>
      </section>

        {/* 4. Services Overview */}
      <section id="services" className="py-10 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] mb-1 block">
                Full Service Hospitality
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">
                Seamless Travel Experience
              </h2>
              <p className="text-gray-600 max-w-2xl mt-1.5 text-xs sm:text-base">
                We handle every detail from Guwahati airport pickup to boutique stays, so you can enjoy the magic of nature.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-[#f7f8f4] border border-gray-200/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group">
              <Bus className="text-[#1e4630] mb-4 sm:mb-6 w-8 h-8 sm:w-10 sm:h-10" />
              <h3 className="text-lg sm:text-xl font-bold text-[#1c1716] mb-2 sm:mb-3">
                Guwahati Airport Pickup
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Comfortable, timely transfers from Guwahati Airport / Station directly to Shillong, Cherrapunji, or Kaziranga.
              </p>
            </div>

            <div className="bg-[#f7f8f4] border border-gray-200/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group">
              <Route className="text-[#1e4630] mb-4 sm:mb-6 w-8 h-8 sm:w-10 sm:h-10" />
              <h3 className="text-lg sm:text-xl font-bold text-[#1c1716] mb-2 sm:mb-3">
                Customized Itineraries
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                From adventurous root bridge treks to serene Dawki river boating, we tailor every stop to your travel pace.
              </p>
            </div>

            <div className="bg-[#f7f8f4] border border-gray-200/60 rounded-2xl sm:rounded-3xl p-5 sm:p-8 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group">
              <Hotel className="text-[#1e4630] mb-4 sm:mb-6 w-8 h-8 sm:w-10 sm:h-10" />
              <h3 className="text-lg sm:text-xl font-bold text-[#1c1716] mb-2 sm:mb-3">
                Homestay &amp; Hotel Stays
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Handpicked accommodations ranging from cozy Meghalaya homestays to luxury forest resorts.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 7. Happy Customer Journey Gallery Section with Dual Infinite Marquee */}
      <TravelerGallerySection items={cmsGallery} />
       {/* 3. Feature Section */}
      <section className="py-10 sm:py-20 bg-[#f7f8f4] font-manrope">
        <div className="flex flex-col xl:flex-row items-center justify-between w-full max-w-[1264px] mx-auto gap-8 xl:gap-[88px] px-4 sm:px-6">

          <div className="relative rounded-2xl sm:rounded-[32px] w-full xl:w-1/2 h-64 sm:h-80 md:h-[420px] shrink-0 overflow-hidden shadow-lg sm:shadow-xl border border-black/5">
            <img
              alt="Meghalaya Nature Trails"
              className="absolute inset-0 object-cover size-full hover:scale-105 transition-transform duration-700"
              src="/img/branding/guideDada.png"
            />
          </div>

          <div className="flex flex-col items-center xl:items-start text-center xl:text-left w-full xl:w-1/2 shrink-0 overflow-hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] mb-2">
              Zero Friction Travel
            </span>
            <h2 className="font-medium leading-tight text-[#1c1716] text-2xl sm:text-4xl md:text-[48px] tracking-tight mb-4 w-full max-w-[500px]">
              No Complexity. No Noise. Cultivate Future Trails
            </h2>
            <p className="font-normal leading-relaxed text-[#1c1716]/80 text-sm sm:text-base mb-6 w-full max-w-[480px]">
              Borah Tours &amp; Travel reimagines how travelers connect with Northeast India. We blend dedicated local drivers, handcrafted homestay itineraries, and Guwahati airport transfers to make your vacation effortless and memorable.
            </p>

            <button
              onClick={() => openWizard()}
              className="btn-hover bg-[#c6f022] text-[#1e4630] font-bold flex gap-2 items-center justify-center px-8 py-3.5 rounded-full cursor-pointer w-full sm:w-[220px] h-[50px] shadow-md"
            >
              <span>Custom Plan</span>
              <ArrowRight size={18} className="text-[#1e4630]" />
            </button>
          </div>

        </div>
      </section>

      {/* 8. Phone Lead Capture Component */}
      <PhoneLeadSection />

      {/* 8. Inline Custom Trip Request Section */}
      <section id="custom-trip" className="py-10 sm:py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-[#1e4630] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-3 sm:space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c6f022]">
                Customized Itineraries
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                {cmsSettings?.customTripTitle || "Want a Personalized Tour Plan?"}
              </h2>
              <p className="text-white/80 text-xs sm:text-base leading-relaxed">
                {cmsSettings?.customTripSubtitle || "Tell us your tentative dates, places you wish to visit, and number of travelers. We will design a custom itinerary with a dedicated private vehicle."}
              </p>

              <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={() => openWizard()}
                  className="btn-hover w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#c6f022] text-[#1e4630] font-bold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Launch Custom Trip Wizard</span>
                  {/* <Sparkles size={16} /> */}
                </button>

                <a
                  href="https://wa.me/917002674473?text=Hi%20Borah%20Tour%20and%20Travels%2C%20I%20want%20to%20discuss%20a%20customized%20Meghalaya%20%26%20Assam%20trip."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 border-white text-white font-bold text-xs sm:text-sm hover:bg-white hover:text-[#1e4630] transition-colors flex items-center justify-center gap-2 decoration-none cursor-pointer"
                >
                  <MessageSquare size={16} />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Mobile Sticky Bottom Action Bar */}
      {/* <MobileBottomNav onOpenWizard={() => openWizard()} /> */}

      {/* Multi-Step Custom Trip Wizard Modal */}
      <TripWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        initialPackageTitle={wizardPackageTitle}
      />

      {/* Package Detail Itinerary Breakdown Modal */}
      <PackageDetailModal
        pkg={selectedDetailPackage}
        onClose={() => setSelectedDetailPackage(null)}
        onCustomize={(title) => openWizard(title)}
      />
      

    </div>
  );
}
