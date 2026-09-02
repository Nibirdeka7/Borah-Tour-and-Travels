"use client";

import React, { useState, useRef } from "react";
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
  ExternalLink
} from "lucide-react";

import WhatsAppButton from "@/components/WhatsAppButton";
import TripWizardModal from "@/components/TripWizardModal";
import PhoneLeadSection from "@/components/PhoneLeadSection";
import PackageDetailModal, { PackageData } from "@/components/PackageDetailModal";
import MobileBottomNav from "@/components/MobileBottomNav";
import CarRatesSection from "@/components/CarRatesSection";
import VehicleFleetSection from "@/components/VehicleFleetSection";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Hero Video Playlist State (playing 3 videos sequentially inside the mask)
  const heroVideos = [
    { src: "/heroVid.mp4", rotate: false },
    { src: "/cherapunji.mp4", rotate: true },
    { src: "/heroBGVideo.mp4", rotate: false },
  ];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleHeroVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
  };

  // Google Map Route Locations State
  const mapLocations = [
    {
      id: "circuit",
      name: "Full Circuit Loop",
      query: "Guwahati to Shillong to Cherrapunji to Dawki to Mawlynnong to Kaziranga",
      embedUrl: "https://maps.google.com/maps?q=Guwahati+to+Shillong+to+Cherrapunji+to+Dawki+to+Mawlynnong+to+Kaziranga&t=&z=8&ie=UTF8&iwloc=&output=embed",
      distance: "~280-450 km Loop",
      travelTime: "4 to 7 Days Circuit",
      description: "Our signature tour loop starting from Guwahati Airport across Meghalaya & Assam."
    },
    {
      id: "guwahati",
      name: "Guwahati",
      query: "Guwahati, Assam",
      embedUrl: "https://maps.google.com/maps?q=Guwahati,Assam&t=&z=12&ie=UTF8&iwloc=&output=embed",
      distance: "Pickup Hub (0 km)",
      travelTime: "Start / Airport Pickup",
      description: "Gateway to Northeast India, Kamakhya Temple & Brahmaputra river sunset."
    },
    {
      id: "shillong",
      name: "Shillong",
      query: "Shillong, Meghalaya",
      embedUrl: "https://maps.google.com/maps?q=Shillong,Meghalaya&t=&z=12&ie=UTF8&iwloc=&output=embed",
      distance: "98 km from Guwahati",
      travelTime: "2.5 Hours Scenic Drive",
      description: "'Scotland of the East' with pine forests, Umiam Lake, and local Khasi cafes."
    },
    {
      id: "cherrapunji",
      name: "Cherrapunji",
      query: "Cherrapunji, Meghalaya",
      embedUrl: "https://maps.google.com/maps?q=Cherrapunji,Meghalaya&t=&z=12&ie=UTF8&iwloc=&output=embed",
      distance: "54 km from Shillong",
      travelTime: "1.5 Hours Mountain Drive",
      description: "Land of waterfalls, Nohkalikai Falls, double-decker living root bridges & caves."
    },
    {
      id: "dawki",
      name: "Dawki",
      query: "Dawki, Meghalaya",
      embedUrl: "https://maps.google.com/maps?q=Dawki,Meghalaya&t=&z=13&ie=UTF8&iwloc=&output=embed",
      distance: "85 km from Cherrapunji",
      travelTime: "2.5 Hours Drive",
      description: "Famous for the crystal-clear Umngot river boating & Bangladesh border."
    },
    {
      id: "mawlynnong",
      name: "Mawlynnong",
      query: "Mawlynnong, Meghalaya",
      embedUrl: "https://maps.google.com/maps?q=Mawlynnong,Meghalaya&t=&z=14&ie=UTF8&iwloc=&output=embed",
      distance: "30 km from Dawki",
      travelTime: "1 Hour Drive",
      description: "Asia's cleanest village, featuring living root bridge & skywalk view points."
    },
    {
      id: "kaziranga",
      name: "Kaziranga",
      query: "Kaziranga National Park, Assam",
      embedUrl: "https://maps.google.com/maps?q=Kaziranga+National+Park,Assam&t=&z=11&ie=UTF8&iwloc=&output=embed",
      distance: "193 km from Guwahati",
      travelTime: "4.5 Hours Highway Drive",
      description: "UNESCO World Heritage site home to One-horned Rhinos & Wildlife Safaris."
    }
  ];

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

  // Package Data
  const packages: PackageData[] = [
    {
      id: "khasi-retreat",
      title: "The Khasi Hills Weekend Retreat",
      price: "₹12,500",
      duration: "4 Days / 3 Nights",
      image: "/img/cerrapunji.png",
      categories: ["short", "adventure"],
      route: "Guwahati - Shillong - Cherrapunji - Guwahati",
      activityLevel: "Moderate",
      groupSize: "2-6 Pax",
      highlights: [
        "Shillong City Tour & Umiam Lake View",
        "Cherrapunji Waterfalls & Mawsmai Cave",
        "Double Decker Living Root Bridge Hike"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati arrival & Scenic Shillong drive",
          overnight: "Shillong",
          description: "Pickup from Guwahati Airport/Station. Travel NH40 road looking over emerald hills. Stop at Umiam Lake viewpoint for tea and water activities. Explore local Shillong cafes in the evening.",
          highlights: ["Guwahati Airport pickup", "Umiam Lake sightseeing", "Police Bazaar night walk"]
        },
        {
          day: "Day 02",
          title: "Cherrapunji Canyons & Caves exploration",
          overnight: "Cherrapunji",
          description: "Check out from Shillong. Travel to Sohra (Cherrapunji), checking Elephant Falls en route. Inspect deep limestone caves at Mawsmai and stand next to massive waterfall viewpoints.",
          highlights: ["Elephant Falls hike", "Mawsmai Cave exploration", "Nohkalikai Falls photo stop"]
        },
        {
          day: "Day 03",
          title: "Double Decker Root Bridge Hike",
          overnight: "Cherrapunji",
          description: "Descend 3,000 stone steps into Nongriat valley with a local guide. Walk over suspended rope bridges to reach the historic Double-Decker Living Root Bridge. Relax next to crystal waterfalls.",
          highlights: ["Double-Decker Root Bridge trek", "Nongriat natural blue pools", "Rainbow Falls optional extension"]
        },
        {
          day: "Day 04",
          title: "Mawlynnong Cleanest Village & Return",
          overnight: "Departure",
          description: "Visit Mawlynnong, Asia's cleanest village. Hike to the Single Root Bridge in Riwai. Travel back to Guwahati for drop-off at the airport or station.",
          highlights: ["Riwai Single Root Bridge", "Cleanest Village walk", "Guwahati airport dropoff"]
        }
      ]
    },
    {
      id: "family-odyssey",
      title: "Meghalaya Family Odyssey",
      price: "₹18,000",
      duration: "6 Days / 5 Nights",
      image: "/img/shillong.png",
      categories: ["family"],
      route: "Guwahati - Shillong - Cherrapunji - Dawki - Mawlynnong - Guwahati",
      activityLevel: "Easy Sightseeing",
      groupSize: "3-8 Pax (Ideal for families)",
      highlights: [
        "Dawki Crystal River Boating",
        "Mawlynnong (Cleanest Village) walk",
        "Nartiang Monoliths & Jaintia Hills"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Arrival at Guwahati & Shillong Drive",
          overnight: "Shillong",
          description: "Pickup from Guwahati and transfer to Shillong. View pine forests and visit Umiam Lake. Spend a cozy evening at a boutique homestay.",
          highlights: ["Guwahati private transfer", "Umiam Lake sunset", "Homestay traditional dinner"]
        },
        {
          day: "Day 02",
          title: "Laitlum Canyons & Krang Suri Waterfalls",
          overnight: "Shillong",
          description: "Drive to Jaintia hills. Look over the dramatic gorges of Laitlum Canyons. Hike the easy stone pathway down to the bright blue natural pool of Krang Suri Falls.",
          highlights: ["Laitlum Canyons viewing", "Krang Suri pool swim/boat", "Shillong local market shopping"]
        },
        {
          day: "Day 03",
          title: "Cherrapunji Waterfall Sightseeing",
          overnight: "Cherrapunji",
          description: "Drive from Shillong to Cherrapunji. Visit Eco Park, Seven Sisters Falls, and Nohkalikai falls. Explore the safe and well-lit Arwah Caves.",
          highlights: ["Arwah Cave fossil walk", "Nohkalikai waterfalls", "Eco park views"]
        },
        {
          day: "Day 04",
          title: "Dawki Boating & Cleanest Village tour",
          overnight: "Dawki / Mawlynnong",
          description: "Drive to Dawki border. Board a traditional wooden boat on the crystal clear Umngot River. Travel to Mawlynnong for a peaceful evening walk.",
          highlights: ["Umngot River boat cruise", "Mawlynnong local dinner", "Skywalk bamboo tower lookouts"]
        },
        {
          day: "Day 05",
          title: "Riwai Single Root Bridge & Shillong Return",
          overnight: "Shillong",
          description: "Check the Riwai root bridge in the morning. Travel back to Shillong, stopping at Elephant Falls for photos. Relax at your hotel.",
          highlights: ["Riwai Root Bridge walk", "Elephant Falls viewpoint", "Cafes and music lounge visiting"]
        },
        {
          day: "Day 06",
          title: "Kamakhya Temple Cruise & Return",
          overnight: "Departure",
          description: "Drive back to Guwahati. Visit the historic Kamakhya Temple on Nilachal Hills. Transfer to Guwahati airport for your onward journey.",
          highlights: ["Kamakhya Temple darshan", "Local handicraft shopping", "Guwahati airport dropoff"]
        }
      ]
    },
    {
      id: "adventure-pack",
      title: "The Ultimate Adventure Pack",
      price: "₹22,500",
      duration: "7 Days / 6 Nights",
      image: "/img/bac 1.png",
      categories: ["adventure"],
      route: "Guwahati - Mawryngkhang - Cherrapunji - Dawki - Guwahati",
      activityLevel: "Challenging / Active",
      groupSize: "2-6 Pax",
      highlights: [
        "Mawryngkhang Trek (Bamboo Skywalk Trail)",
        "Laitlum Canyons & Deep Cave Crawls",
        "Umngot River Kayaking & Camping"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Shillong scenic drive",
          overnight: "Shillong",
          description: "Meet your guide at Guwahati airport. Travel to Shillong, setup gear, and attend a trip briefing with local outdoor experts.",
          highlights: ["Guwahati airport pickup", "Gear checklist check", "Local organic dinner"]
        },
        {
          day: "Day 02",
          title: "Mawryngkhang Bamboo Skywalk trek",
          overnight: "Shillong",
          description: "Travel to Wahkhen village. Embark on the famous Mawryngkhang Trek—a trail built entirely on bamboo bridges hugging steep granite cliffs. High adrenaline guaranteed.",
          highlights: ["Bamboo sky bridge walk", "Mawryngkhang sacred rock summit", "River swimming at Wahkhen"]
        },
        {
          day: "Day 03",
          title: "Cherrapunji Canyons & Deep Caves hike",
          overnight: "Cherrapunji",
          description: "Drive to Cherrapunji. Hike along the Laitlum Canyon ridge. Head deep into wild limestone cave structures with helmets and headlamps.",
          highlights: ["Laitlum Canyons trek", "Wild cave exploration", "Sohra cliff sunset"]
        },
        {
          day: "Day 04",
          title: "Krem Liat Prah cave crawl & exploration",
          overnight: "Cherrapunji",
          description: "Join professional guides to explore Krem Liat Prah, one of the longest natural cave systems in South Asia. Walk through massive fossil galleries.",
          highlights: ["Liat Prah cave exploration", "Fossil sighting", "Adventure safety coordination"]
        },
        {
          day: "Day 05",
          title: "Double Decker Bridge & Rainbow Falls hike",
          overnight: "Cherrapunji",
          description: "Descend into Nongriat. Visit the Double Decker bridge and continue trekking 1.5 hours further into the jungle to reach the majestic Rainbow Falls.",
          highlights: ["Double Decker root bridge", "Rainbow Falls wild trek", "Suspension bridge crossings"]
        },
        {
          day: "Day 06",
          title: "Dawki River Kayaking & Camping",
          overnight: "Dawki Camping",
          description: "Drive to Dawki. Spend the day kayaking, cliff jumping, and snorkeling in the transparent Umngot River. Sleep in riverside tents under the stars.",
          highlights: ["Umngot river kayaking", "Cliff jumping", "Riverside bonfire and camping"]
        },
        {
          day: "Day 07",
          title: "Return to Guwahati",
          overnight: "Departure",
          description: "Wake up to a riverside sunrise. Drive back to Guwahati for silk shopping and airport drop-off.",
          highlights: ["Guwahati transfer", "Assamese local lunch", "Guwahati airport dropoff"]
        }
      ]
    },
    {
      id: "assam-wildlife",
      title: "Assam Wildlife & Brahmaputra Trails",
      price: "₹16,000",
      duration: "4 Days / 3 Nights",
      image: "/img/kaziranga.png",
      categories: ["short", "family"],
      route: "Guwahati - Kaziranga - Guwahati",
      activityLevel: "Easy",
      groupSize: "2-8 Pax",
      highlights: [
        "Kaziranga Jeep & Elephant Safari",
        "Assam Tea Garden walking tours",
        "Brahmaputra Sunset cruise"
      ],
      itinerary: [
        {
          day: "Day 01",
          title: "Guwahati to Kaziranga National Park",
          overnight: "Kaziranga",
          description: "Pickup from Guwahati. Drive to Kaziranga, home of the Great One-horned Rhinoceros. Check into a beautiful jungle resort. Attend an evening cultural Assamese dance show.",
          highlights: ["Guwahati pickup", "Scenic Assam rural drive", "Bihu cultural show"]
        },
        {
          day: "Day 02",
          title: "Kaziranga Elephant & Jeep Safaris",
          overnight: "Kaziranga",
          description: "Start with a pre-dawn Elephant safari in the Western range to view rhinos up close. In the afternoon, board an open 4x4 Jeep for a safari in the Central range to spot wild water buffaloes and tigers.",
          highlights: ["Elephant riding safari", "Jeep wildlife safari", "Orchid and biodiversity park walk"]
        },
        {
          day: "Day 03",
          title: "Tea Garden walk & Sunset River Cruise",
          overnight: "Guwahati",
          description: "Walk through the historic tea garden trails. Travel back to Guwahati. In the evening, board a premium cruise liner on the Brahmaputra River for sunset views.",
          highlights: ["Assam Tea Estate walk", "Guwahati transfer", "Brahmaputra sunset river cruise"]
        },
        {
          day: "Day 04",
          title: "Kamakhya Temple visit & Silk Shopping",
          overnight: "Departure",
          description: "Visit the sacred Kamakhya Temple atop Nilachal Hill. Shop for authentic Muga and Pat silk garments before airport drop-off.",
          highlights: ["Kamakhya Temple darshan", "Silk markets shopping", "Guwahati airport dropoff"]
        }
      ]
    }
  ];

  // Destination Data
  const destinations = [
    {
      id: "shillong",
      num: "01",
      name: "Shillong",
      state: "Meghalaya",
      duration: "2-3 Days",
      image: "/img/shillong.png",
      desc: "Often referred to as the 'Scotland of the East', Shillong is a vibrant capital surrounded by pine trees, majestic peaks, and a rich musical culture.",
      spanClass: "md:col-span-8"
    },
    {
      id: "cherrapunji",
      num: "02",
      name: "Cherrapunji",
      state: "Meghalaya",
      duration: "2 Days",
      image: "/img/cerrapunji.png",
      desc: "The Land of Waterfalls. Experience living root bridges and dramatic canyon landscapes where clouds meet the earth.",
      spanClass: "md:col-span-4 md:mt-12"
    },
    {
      id: "kaziranga",
      num: "03",
      name: "Kaziranga National Park",
      state: "Assam",
      duration: "2-3 Days",
      image: "/img/kaziranga.png",
      desc: "UNESCO World Heritage Site in Assam, hosting two-thirds of the world's great One-horned Rhinoceroses, wild buffaloes, and tigers.",
      spanClass: "md:col-span-12 md:-mt-4"
    },
    {
      id: "dawki",
      num: "04",
      name: "Dawki",
      state: "Meghalaya",
      duration: "1 Day",
      image: "/img/bac 3.png",
      desc: "Famous for the crystal-clear Umngot River, where wooden boats seem to float effortlessly on transparent waters.",
      spanClass: "md:col-span-6"
    },
    {
      id: "mawlynnong",
      num: "05",
      name: "Mawlynnong",
      state: "Meghalaya",
      duration: "1 Day",
      image: "/img/bac 4.png",
      desc: "Asia's Cleanest Village. A testament to community-driven eco-tourism and living in harmony with nature.",
      spanClass: "md:col-span-6"
    }
  ];

  const filteredPackages = activeFilter === "all"
    ? packages
    : packages.filter(pkg => pkg.categories.includes(activeFilter));

  const filterButtons = [
    { label: "All Trips", value: "all" },
    { label: "Short Trips", value: "short" },
    { label: "Family Tours", value: "family" },
    { label: "Adventure Packs", value: "adventure" }
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
                A new way to live with Nature
              </h1>
              <p className="text-xs sm:text-base md:text-lg text-[#1c1716]/80 font-normal leading-relaxed max-w-2xl">
                We redesigned how travelers connect with nature, explore hidden waterfalls, and experience local Khasi &amp; Assamese culture—all in one customized private tour service.
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
              <video
                key={heroVideos[currentVideoIndex].src}
                autoPlay
                muted
                playsInline
                onEnded={handleHeroVideoEnd}
                className={`absolute object-cover transition-all duration-700 ease-in-out ${
                  heroVideos[currentVideoIndex].rotate
                    ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
                    : "top-0 left-0 w-full h-full"
                }`}
                style={
                  heroVideos[currentVideoIndex].rotate
                    ? {
                        width: "calc(100% * 667 / 1213)",
                        height: "calc(100% * 1213 / 667)",
                      }
                    : {}
                }
              >
                <source src={heroVideos[currentVideoIndex].src} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

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
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                        currentVideoIndex === idx
                          ? "bg-[#c6f022] shadow-[0_0_10px_rgba(198,240,34,0.8)]"
                          : "bg-white/35 group-hover:bg-white/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Floating CTA Card (Bottom Left) */}
            <div className="hidden sm:block absolute bottom-6 left-6 bg-white p-5 rounded-3xl shadow-2xl max-w-[290px] z-20 border border-black/5">
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
                Local Khasi Drivers
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
      {/* 3. Feature Section */}
      <section className="py-10 sm:py-20 bg-[#f7f8f4] font-manrope">
        <div className="flex flex-col xl:flex-row items-center justify-between w-full max-w-[1264px] mx-auto gap-8 xl:gap-[88px] px-4 sm:px-6">
          
          <div className="relative rounded-2xl sm:rounded-[32px] w-full xl:w-1/2 h-64 sm:h-80 md:h-[420px] shrink-0 overflow-hidden shadow-lg sm:shadow-xl border border-black/5">
            <img
              alt="Meghalaya Nature Trails"
              className="absolute inset-0 object-cover size-full hover:scale-105 transition-transform duration-700"
              src="/img/guide.png"
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
                Explore our handpicked selection of must-visit locations across Meghalaya &amp; Assam.
              </p>
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-between mb-3 text-xs font-bold text-[#1e4630] uppercase tracking-wider">
            <span>Must-Visit Places</span>
            <span className="flex items-center gap-1 opacity-80 text-[11px]">Swipe →</span>
          </div>

          {/* Responsive Layout: Mobile Horizontal Carousel / Desktop Bento Grid */}
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-12 sm:gap-6">
            {destinations.map((dest) => (
              <article
                key={dest.id}
                className={`w-[82vw] sm:w-auto shrink-0 snap-center ${dest.spanClass} group relative rounded-2xl sm:rounded-3xl overflow-hidden h-72 sm:h-96 md:h-[420px] shadow-md sm:shadow-lg border border-black/5`}
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
                    <span className="text-[#c6f022] text-2xl sm:text-3xl font-bold opacity-70">
                      {dest.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border shrink-0 ${
                      isActive
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

      {/* 6. Tour Packages Section */}
      <section id="packages" className="py-10 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] block mb-1">
              Popular Tour Packages
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">
              Curated Northeast Experiences
            </h2>
            <p className="text-gray-600 mt-1.5 text-xs sm:text-sm">
              Discover Meghalaya and Assam through our handcrafted itineraries. Select a category tab to filter.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mt-5 justify-center items-center bg-[#f7f8f4] p-1 sm:p-1.5 rounded-2xl sm:rounded-full border border-gray-200 max-w-fit mx-auto">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setActiveFilter(btn.value)}
                  className={`px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === btn.value
                      ? "bg-[#1e4630] text-[#c6f022] shadow-md"
                      : "text-gray-600 hover:bg-gray-200/60"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center justify-between mb-3 text-xs font-bold text-[#1e4630] uppercase tracking-wider">
            <span>Handcrafted Packages</span>
            <span className="flex items-center gap-1 opacity-80 text-[11px]">Swipe →</span>
          </div>

          {/* Responsive Layout: Mobile Horizontal Carousel / Desktop Grid */}
          <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {filteredPackages.map((pkg) => {
              const waMessage = `Hi Borah Tours & Travel! I want to book the private tour package:
- *Package:* ${pkg.title}
- *Duration:* ${pkg.duration}
- *Price:* ${pkg.price} / Pax

Please share available dates and booking details!`;
              const waLink = `https://wa.me/917002674473?text=${encodeURIComponent(waMessage)}`;

              return (
                <article
                  key={pkg.id}
                  className="w-[85vw] sm:w-auto shrink-0 snap-center group relative flex flex-col bg-[#f7f8f4] border border-gray-200/70 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-[#1e4630]">
                    <img
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={pkg.title}
                      src={pkg.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#c6f022] text-[#1e4630] px-3 py-1 rounded-full font-bold text-[11px] sm:text-xs uppercase shadow-sm">
                      {pkg.price} / pax
                    </div>

                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-1.5 text-white text-xs font-medium">
                      <Clock size={14} className="text-[#c6f022]" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col flex-grow space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1c1716] line-clamp-2 group-hover:text-[#1e4630] transition-colors">
                      {pkg.title}
                    </h3>

                    <div className="space-y-2 flex-grow">
                      <p className="text-[10px] sm:text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                        Trip Highlights
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1.5 pl-0 list-none mb-0">
                        {pkg.highlights.map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-[#1e4630] shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 mt-auto flex items-center gap-2.5">
                      <button
                        onClick={() => setSelectedDetailPackage(pkg)}
                        className="btn-hover flex-grow py-2.5 sm:py-3 bg-white text-[#1e4630] text-center font-bold text-xs uppercase tracking-wider rounded-xl sm:rounded-2xl border border-gray-300 hover:bg-[#1e4630] hover:text-[#c6f022] transition-all cursor-pointer shadow-sm"
                      >
                        View Itinerary
                      </button>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#c6f022] text-[#1e4630] rounded-xl sm:rounded-2xl shadow-md hover:scale-105 transition-transform cursor-pointer decoration-none"
                        title="Book via WhatsApp"
                      >
                        <MessageSquare size={18} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Phone Lead Capture Component */}
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
                Want a Personalized Tour Plan?
              </h2>
              <p className="text-white/80 text-xs sm:text-base leading-relaxed">
                Tell us your tentative dates, places you wish to visit, and number of travelers. We will design a custom itinerary with a dedicated private vehicle.
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
