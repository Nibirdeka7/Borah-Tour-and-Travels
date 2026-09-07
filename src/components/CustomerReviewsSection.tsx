"use client";

import React, { useState } from "react";
import { Star, CheckCircle, Quote, ThumbsUp, MapPin, Sparkles } from "lucide-react";

export interface ReviewItem {
  id: number;
  name: string;
  location: string;
  avatarBg: string;
  initials: string;
  rating: number;
  date: string;
  trip: string;
  category: "meghalaya" | "tawang" | "assam";
  review: string;
}

const defaultReviews: ReviewItem[] = [
  {
    id: 1,
    name: "Rahul & Sangeeta Mukherjee",
    location: "Kolkata, WB",
    avatarBg: "bg-[#1e4630] text-white",
    initials: "RM",
    rating: 5.0,
    date: "Aug 2026",
    trip: "5D/4N Meghalaya Explorer",
    category: "meghalaya",
    review:
      "Booked a Swift Dzire with driver Dada for our 5-day Meghalaya trip from Guwahati airport. The driving on mountain roads was super calm and safe. He knew all the small tea stalls near Sohra and shortcut routes to Nohkalikai. Worth every rupee."
  },
  {
    id: 2,
    name: "Ankit Verma",
    location: "Bengaluru, KA",
    avatarBg: "bg-[#306855] text-white",
    initials: "AV",
    rating: 4.5,
    date: "Jul 2026",
    trip: "6D Tawang & Sela Pass Circuit",
    category: "tawang",
    review:
      "We were quite worried about altitude and permits for Tawang, but Borah Tour & Travels managed the ILP permits seamlessly before we landed. Sela Pass weather was super cold, but our Innova was well heated. Only slight delay due to fog near Bomdila, otherwise perfect experience."
  },
  {
    id: 3,
    name: "Priya & Vikram Deshmukh",
    location: "Pune, MH",
    avatarBg: "bg-[#346576] text-white",
    initials: "PD",
    rating: 5.0,
    date: "Jul 2026",
    trip: "Dawki & Living Root Bridge Day Trip",
    category: "meghalaya",
    review:
      "Very transparent pricing. No hidden fees or sudden demands like local street taxis. The driver waited patiently while we did the boat ride in Dawki and walked down Riwai village. Highly recommended for couples!"
  },
  {
    id: 4,
    name: "Dr. Arisudan Sharma",
    location: "New Delhi",
    avatarBg: "bg-[#1f4e38] text-white",
    initials: "AS",
    rating: 4.0,
    date: "Jun 2026",
    trip: "Family Assam & Kaziranga Safari",
    category: "assam",
    review:
      "Good, reliable service. Vehicle arrived right on time at Guwahati railway station at 6 AM. Clean car, polite driver who arranged our Kaziranga jeep safari passes without hassle. Will use again when visiting Shillong next year."
  },
  {
    id: 5,
    name: "Meera Nair",
    location: "Kochi, KL",
    avatarBg: "bg-[#006d2f] text-white",
    initials: "MN",
    rating: 4.5,
    date: "May 2026",
    trip: "7D Full Meghalaya & Waterfalls Trek",
    category: "meghalaya",
    review:
      "Awesome experience trekking to Double Decker root bridge and Krang Suri. Driver Pankaj was punctual every morning and suggested great local food joints along the way. Clean vehicle and smooth communication on WhatsApp."
  }
];

export default function CustomerReviewsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredReviews =
    activeFilter === "all"
      ? defaultReviews
      : defaultReviews.filter((r) => r.category === activeFilter);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4 shrink-0">
          <Star className="w-4 h-4 text-gray-300 fill-gray-200" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300 fill-gray-200 shrink-0"
        />
      );
    }

    return stars;
  };

  return (
    <section className="py-12 sm:py-20 bg-white font-manrope border-t border-gray-100 relative overflow-hidden">
      <div className="max-w-[1264px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#1c1716]">
              Trusted by 300+ Explorers
            </h2>
            <p className="text-xs sm:text-sm text-[#1c1716]/75 mt-2 leading-relaxed">
              Unfiltered, genuine reviews from travelers who explored Meghalaya, Assam &amp; Arunachal Pradesh with our private cabs and local drivers.
            </p>
          </div>

          {/* Overall Rating Summary Box */}
          <div className="flex items-center gap-4 bg-[#f7f8f4] border border-gray-200/80 rounded-2xl p-4 sm:px-6 shrink-0 shadow-sm">
            <div className="text-center border-r border-gray-200/80 pr-4">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1e4630] leading-none">
                4.8
              </div>
              <div className="flex items-center gap-0.5 mt-1 justify-center">
                {renderStars(5)}
              </div>
              <span className="text-[11px] text-gray-500 font-semibold block mt-1">
                Out of 5 Stars
              </span>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#1c1716]">
                <CheckCircle className="w-4 h-4 text-[#006d2f]" />
                <span>100% Verified Trips</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Guwahati Airport Pickups &amp; Custom Tours
              </p>
            </div>
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "all"
                ? "bg-[#1e4630] text-white shadow-sm"
                : "bg-[#f7f8f4] text-gray-700 hover:bg-gray-200/70 border border-gray-200/60"
            }`}
          >
            All Reviews ({defaultReviews.length})
          </button>
          <button
            onClick={() => setActiveFilter("meghalaya")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "meghalaya"
                ? "bg-[#1e4630] text-white shadow-sm"
                : "bg-[#f7f8f4] text-gray-700 hover:bg-gray-200/70 border border-gray-200/60"
            }`}
          >
            Meghalaya Tours
          </button>
          <button
            onClick={() => setActiveFilter("tawang")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "tawang"
                ? "bg-[#1e4630] text-white shadow-sm"
                : "bg-[#f7f8f4] text-gray-700 hover:bg-gray-200/70 border border-gray-200/60"
            }`}
          >
            Arunachal &amp; Tawang
          </button>
          <button
            onClick={() => setActiveFilter("assam")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === "assam"
                ? "bg-[#1e4630] text-white shadow-sm"
                : "bg-[#f7f8f4] text-gray-700 hover:bg-gray-200/70 border border-gray-200/60"
            }`}
          >
            Assam &amp; Kaziranga
          </button>
        </div>

        {/* Reviews Cards Container: Vertically Scrollable on Mobile, Grid on Desktop */}
        <div className="relative">
          {/* Mobile Vertical Scroll Guide */}
          <div className="md:hidden flex items-center justify-between text-[11px] font-semibold text-[#1e4630] mb-3 px-1">
            <span className="flex items-center gap-1.5 bg-[#1e4630]/10 px-3 py-1 rounded-full border border-[#1e4630]/15">
              <span>Scroll down to view reviews</span>
              <span className="animate-bounce">↓</span>
            </span>
            <span className="text-gray-400 font-normal">({filteredReviews.length} reviews)</span>
          </div>

          <div className="max-h-[460px] md:max-h-none overflow-y-auto md:overflow-visible pr-1 md:pr-0 space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 snap-y snap-mandatory scroll-smooth no-scrollbar">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="snap-start bg-[#f7f8f4] border border-gray-200/70 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative group shrink-0"
              >
                <div>
                  {/* Top Row: Stars + Rating Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1">
                      {renderStars(rev.rating)}
                      <span className="text-xs font-bold text-[#1c1716] ml-1.5">
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#1e4630]/10 text-[#1e4630] px-2.5 py-0.5 rounded-full border border-[#1e4630]/15">
                      <CheckCircle className="w-3 h-3 text-[#1e4630]" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#1c1716]/85 leading-relaxed mb-5 font-normal">
                    &ldquo;{rev.review}&rdquo;
                  </p>
                </div>

                {/* Card Footer: User Info & Trip Tag */}
                <div className="pt-3.5 border-t border-gray-200/60 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${rev.avatarBg} font-bold text-xs flex items-center justify-center shrink-0 shadow-sm`}
                      >
                        {rev.initials}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#1c1716] leading-tight">
                          {rev.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>{rev.location}</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-gray-400">
                      {rev.date}
                    </span>
                  </div>

                  {/* Tagged Trip */}
                  <div className="bg-white/80 rounded-xl px-3 py-1.5 border border-gray-200/50 flex items-center justify-between text-[11px]">
                    <span className="text-gray-500 font-medium truncate max-w-[190px]">
                      {rev.trip}
                    </span>
                    <ThumbsUp className="w-3 h-3 text-[#006d2f] shrink-0" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Bottom Gradient Fade Mask */}
          <div className="md:hidden pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white via-white/60 to-transparent rounded-b-2xl"></div>
        </div>
      </div>
    </section>
  );
}
