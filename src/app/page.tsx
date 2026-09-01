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
  ChevronRight
} from "lucide-react";

import WhatsAppButton from "@/components/WhatsAppButton";
import TripWizardModal from "@/components/TripWizardModal";
import PhoneLeadSection from "@/components/PhoneLeadSection";
import PackageDetailModal, { PackageData } from "@/components/PackageDetailModal";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

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

      const phoneNumber = "919876543210";
      const customMessage = `Hi Borah Tours & Travels, I have submitted a customized trip enquiry:
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
      <section id="home" className="relative min-h-[800px] pt-28 pb-16 bg-[#f7f8f4] overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "radial-gradient(#1e4630 0.75px, transparent 0.75px)",
            backgroundSize: "24px 24px"
          }}
        ></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-8 flex flex-col pt-2">
           
              <h1 className="text-4xl md:text-6xl font-display-lg text-[#1c1716] font-medium tracking-[-1.5px] leading-[1.12]">
                A new way to live with Nature
              </h1>
              <p className="text-base md:text-lg text-[#1c1716]/80 font-normal leading-[1.55] max-w-2xl">
                We redesigned how travelers connect with nature, explore hidden waterfalls, and experience local Khasi & Assamese culture—all in one customized private tour service with Guwahati airport pickup.
              </p>
            </div>
          </div>

          {/* SVG Masked Hero Visual Container */}
          <div className="relative w-full rounded-3xl overflow-hidden group ">
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
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/heroVid.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>

            {/* Floating Small White CTA Card (Bottom Left) */}
            <div className="absolute bottom-6 left-6 bg-white p-5 rounded-3xl shadow-2xl max-w-[260px] sm:max-w-[290px] z-20 border border-black/5 animate-in">
              <span className="text-[11px] font-semibold text-[#1e4630] uppercase tracking-wider block mb-1.5">
                250+ Happy Travelers Joined
              </span>
              
              {/* Avatar Group */}
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

            {/* Floating Action Buttons / Quick Badges (Bottom Right) */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
              <a
                href="#packages"
                className="btn-hover bg-[#c6f022] text-[#1e4630] text-xs font-bold px-6 py-3 rounded-2xl shadow-lg decoration-none flex items-center gap-2"
              >
                <span>Explore Packages</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Counter Section - Adapted from guide/3.txt `le` component */}
      <section className="w-full py-16 bg-[#ffffff] border-y border-gray-100 font-manrope">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[90px] items-start justify-center relative w-full max-w-[1200px] mx-auto px-6">
          
          <div className="flex flex-col gap-3 items-center lg:items-start text-center lg:text-left">
            <p className="font-medium leading-[1.12] text-[#1c1716] text-[40px] md:text-[48px] tracking-[-1.44px]">
              98%
            </p>
            <div className="flex flex-col gap-1 text-[#1c1716]">
              <p className="font-semibold text-[18px] md:text-[20px]">
                5-Star Ratings
              </p>
              <p className="font-normal text-[14px] text-gray-600 leading-[1.55]">
                Helping travelers navigate living root bridges, canyons, and waterfalls seamlessly.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center lg:items-start text-center lg:text-left">
            <p className="font-medium leading-[1.12] text-[#1c1716] text-[40px] md:text-[48px] tracking-[-1.44px]">
              150+
            </p>
            <div className="flex flex-col gap-1 text-[#1c1716]">
              <p className="font-semibold text-[18px] md:text-[20px]">
                Private Tours Handled
              </p>
              <p className="font-normal text-[14px] text-gray-600 leading-[1.55]">
                Enabling family vacations and adventurous road trips across Meghalaya &amp; Assam.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center lg:items-start text-center lg:text-left">
            <p className="font-medium leading-[1.12] text-[#1c1716] text-[40px] md:text-[48px] tracking-[-1.44px]">
              100%
            </p>
            <div className="flex flex-col gap-1 text-[#1c1716]">
              <p className="font-semibold text-[18px] md:text-[20px]">
                Local Khasi Drivers
              </p>
              <p className="font-normal text-[14px] text-gray-600 leading-[1.55]">
                Travel with trusted local drivers who know every hidden gem and secret trail.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center lg:items-start text-center lg:text-left">
            <p className="font-medium leading-[1.12] text-[#1c1716] text-[40px] md:text-[48px] tracking-[-1.44px]">
              85%
            </p>
            <div className="flex flex-col gap-1 text-[#1c1716]">
              <p className="font-semibold text-[18px] md:text-[20px]">
                More Custom Value
              </p>
              <p className="font-normal text-[14px] text-gray-600 leading-[1.55]">
                No middleman markup. Direct coordination with local homestays and private vehicles.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Feature Section 02 - Adapted from guide/3.txt `ne` component */}
      <section className="py-20 bg-[#f7f8f4] font-manrope">
        <div className="flex flex-col xl:flex-row items-center justify-between w-full max-w-[1264px] mx-auto gap-[40px] xl:gap-[88px] px-6">
          
          <div className="relative rounded-[32px] w-full xl:w-1/2 h-auto aspect-[642/496] shrink-0 overflow-hidden shadow-xl border border-black/5">
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
            <h2 className="font-medium leading-[1.12] text-[#1c1716] text-[32px] md:text-[48px] tracking-[-1.44px] mb-[20px] w-full max-w-[500px]">
              No Complexity. No Noise. Cultivate Future Trails
            </h2>
            <p className="font-normal leading-[1.6] text-[#1c1716]/80 text-[16px] mb-[32px] w-full max-w-[480px]">
              Borah Tours reimagines how travelers connect with Northeast India. We blend dedicated local drivers, handcrafted homestay itineraries, and Guwahati airport transfers to make your vacation effortless and memorable.
            </p>

            <button
              onClick={() => openWizard()}
              className="btn-hover bg-[#c6f022] text-[#1e4630] font-bold flex gap-[10px] items-center justify-center px-[33px] py-[15px] rounded-[35px] cursor-pointer w-full sm:w-[220px] h-[52px] shadow-md"
            >
              <span>Custom Plan</span>
              <ArrowRight size={18} className="text-[#1e4630]" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Services Overview */}
      <section id="services" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] mb-1 block">
                Full Service Hospitality
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">
                Seamless Travel Experience
              </h2>
              <p className="text-gray-600 max-w-2xl mt-2 text-sm sm:text-base">
                We handle every detail from Guwahati airport pickup to boutique stays, so you can enjoy the magic of nature.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f7f8f4] border border-gray-200/60 rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group">
              <Bus size={40} className="text-[#1e4630] mb-6" />
              <h3 className="text-xl font-bold text-[#1c1716] mb-3">
                Guwahati Airport Pickup
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Comfortable, timely transfers from Guwahati Airport / Station directly to Shillong, Cherrapunji, or Kaziranga.
              </p>
            </div>

            <div className="bg-[#f7f8f4] border border-gray-200/60 rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group">
              <Route size={40} className="text-[#1e4630] mb-6" />
              <h3 className="text-xl font-bold text-[#1c1716] mb-3">
                Customized Itineraries
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                From adventurous root bridge treks to serene Dawki river boating, we tailor every stop to your travel pace.
              </p>
            </div>

            <div className="bg-[#f7f8f4] border border-gray-200/60 rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group">
              <Hotel size={40} className="text-[#1e4630] mb-6" />
              <h3 className="text-xl font-bold text-[#1c1716] mb-3">
                Homestay & Hotel Stays
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Handpicked accommodations ranging from cozy Meghalaya homestays to luxury forest resorts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Curated Destinations Bento Grid */}
      <section id="destinations" className="w-full bg-[#f7f8f4] py-20 px-6 relative border-t border-gray-200/60">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] mb-1 block">
                Iconic Locations
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">Curated Destinations</h2>
              <p className="text-gray-600 max-w-xl mt-2 text-sm sm:text-base">
                Explore our handpicked selection of must-visit locations across Meghalaya &amp; Assam.
              </p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {destinations.map((dest) => (
              <article
                key={dest.id}
                className={`${dest.spanClass} group relative rounded-3xl overflow-hidden h-[420px] shadow-lg border border-black/5`}
              >
                <img
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src={dest.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                <div className="absolute top-6 right-6">
                  <div className="bg-[#c6f022] text-[#1e4630] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm">
                    {dest.duration}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[#c6f022] text-3xl font-bold opacity-60">
                      {dest.num}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
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

          {/* Roadmap Circuit */}
          <div className="mt-16 flex flex-col lg:flex-row gap-8 items-center pt-8 border-t border-gray-200">
            <div className="w-full lg:w-1/3 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 bg-[#1e4630] text-[#c6f022] px-3.5 py-1 rounded-full self-start font-bold text-xs">
                <Compass size={14} />
                <span>Northeast Circuit</span>
              </div>
              <h3 className="text-2xl font-bold text-[#1c1716]">The Route Map</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our most popular loop connects these locations efficiently starting from Guwahati Airport, ensuring minimal travel fatigue.
              </p>
            </div>

            <div className="w-full lg:w-2/3 h-[380px] rounded-3xl overflow-hidden shadow-xl relative border border-black/5 bg-[#1e4630]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-iv2TsPpxJ4wdoUjbtxcrUqBlHO5zN9aMh55dBu27gKVjUsuLMeymMGH2FAEgKNsa_eIb8Gmy58EoIylHYmNnzH5-0WfS4to5U9_dirEbeyxxyeI_NLYfaKkWaEkyBdHtt0U5W2LWzuVChw16_pOI5rexfjlMq2oXgJOJr7369XYfcp0-SgreYKVwgX-NsA_-lw82W59GCkN2IwX2E1aLo9fxpLSvbh6jItSB8Qg_2MeOAQxRt_zh"
                alt="Circuit Map View"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md flex items-center gap-3 border border-black/5">
                <Car className="text-[#1e4630]" />
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Popular Tour Loop</p>
                  <p className="text-base font-bold text-[#1c1716]">~280 km Guwahati Circuit</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Tour Packages Section */}
      <section id="packages" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] block mb-1">
              Popular Tour Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">
              Curated Northeast Experiences
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Discover Meghalaya and Assam through our handcrafted itineraries. Select a category tab to filter.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2.5 mt-6 justify-center items-center bg-[#f7f8f4] p-1.5 rounded-full border border-gray-200 max-w-fit mx-auto">
              {filterButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setActiveFilter(btn.value)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => {
              const waLink = `https://wa.me/919876543210?text=Hi%20Borah%20Tours%2C%20I'm%20interested%20in%20"${pkg.title}"%20(${pkg.duration}).%20Please%20share%20details.`;

              return (
                <article
                  key={pkg.id}
                  className="group relative flex flex-col bg-[#f7f8f4] border border-gray-200/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-[#1e4630]">
                    <img
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={pkg.title}
                      src={pkg.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    <div className="absolute top-4 right-4 bg-[#c6f022] text-[#1e4630] px-3.5 py-1 rounded-full font-bold text-xs uppercase shadow-sm">
                      {pkg.price} / pax
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs font-medium">
                      <Clock size={14} className="text-[#c6f022]" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <h3 className="text-xl font-bold text-[#1c1716] line-clamp-2 group-hover:text-[#1e4630] transition-colors">
                      {pkg.title}
                    </h3>

                    <div className="space-y-2 flex-grow">
                      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
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

                    <div className="pt-4 mt-auto flex items-center gap-3">
                      <button
                        onClick={() => setSelectedDetailPackage(pkg)}
                        className="btn-hover flex-grow py-3 bg-white text-[#1e4630] text-center font-bold text-xs uppercase tracking-wider rounded-2xl border border-gray-300 hover:bg-[#1e4630] hover:text-[#c6f022] transition-all cursor-pointer shadow-sm"
                      >
                        View Itinerary
                      </button>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 bg-[#c6f022] text-[#1e4630] rounded-2xl shadow-md hover:scale-105 transition-transform cursor-pointer decoration-none"
                        title="Book via WhatsApp"
                      >
                        <MessageSquare size={20} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Phone Lead Capture Component from guide/2.txt */}
      <PhoneLeadSection />

      {/* 8. Inline Custom Trip Request Section */}
      <section id="custom-trip" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#1e4630] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#c6f022]">
                Customized Itineraries
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Want a Personalized Tour Plan?
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Tell us your tentative dates, places you wish to visit, and number of travelers. We will design a custom itinerary with a dedicated private vehicle.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openWizard()}
                  className="btn-hover w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#c6f022] text-[#1e4630] font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Launch Custom Trip Wizard</span>
                  <Sparkles size={16} />
                </button>

                <a
                  href="https://wa.me/919876543210?text=Hi%20Borah%20Tours%2C%20I%20want%20to%20discuss%20a%20customized%20Meghalaya%20trip."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-white text-white font-bold text-sm hover:bg-white hover:text-[#1e4630] transition-colors flex items-center justify-center gap-2 decoration-none cursor-pointer"
                >
                  <MessageSquare size={16} />
                  <span>Chat directly on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />

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
