"use client";

import React, { useState } from "react";
import { Users, Fuel, Calendar, Gauge, Car, MessageSquare, ChevronRight } from "lucide-react";

export interface Vehicle {
  id: string;
  name: string;
  brandModel: string;
  year: string;
  seats: string;
  transmission: string;
  fuel: string;
  ratePerDay: string;
  category: "sedan" | "suv" | "tempo";
  tag?: string;
  image?: string;
}

export default function VehicleFleetSection() {
  const [activeTab, setActiveTab] = useState<"all" | "sedan" | "suv" | "tempo">("all");

  const vehicles: Vehicle[] = [
    {
      id: "dzire-2026",
      name: "Maruti Suzuki Swift Dzire",
      brandModel: "Maruti Suzuki 2026",
      year: "2026",
      seats: "5 Seats",
      transmission: "Manual",
      fuel: "Petrol",
      ratePerDay: "₹4,000",
      category: "sedan",
      tag: "Latest 2026 Edition",
      image: "/img/marutiSuzukiSwiftDezire1.png",
    },
    {
      id: "dzire-tour-s",
      name: "Maruti Suzuki Swift Dzire Tour S",
      brandModel: "Maruti Suzuki Tour",
      year: "2022",
      seats: "5 Seats",
      transmission: "Manual",
      fuel: "Diesel",
      ratePerDay: "₹4,000",
      category: "sedan",
      tag: "Economical & Diesel",
      image: "/img/marutiSuzukiSwiftDezire2.png",
    },
    {
      id: "ertiga-2025",
      name: "Maruti Suzuki Ertiga",
      brandModel: "Maruti Suzuki Ertiga",
      year: "2025",
      seats: "8 Seats",
      transmission: "Manual",
      fuel: "Petrol",
      ratePerDay: "₹5,500",
      category: "suv",
      tag: "Family Favorite",
      image: "/img/ertiga.png",
    },
    {
      id: "innova-crysta",
      name: "Toyota Innova Crysta",
      brandModel: "Toyota Crysta",
      year: "2023",
      seats: "8 Seats",
      transmission: "Manual",
      fuel: "Diesel",
      ratePerDay: "₹6,500",
      category: "suv",
      tag: "Premium Comfort",
      image: "/img/innovaCrysta.png",
    },
    {
      id: "traveller-2024",
      name: "Force Traveller",
      brandModel: "Force Traveller",
      year: "2024",
      seats: "13 Seats",
      transmission: "Manual",
      fuel: "Diesel",
      ratePerDay: "₹8,000",
      category: "tempo",
      tag: "Group Tour Special",
      image: "/img/traveller.png",
    },
    {
      id: "urbania-2025",
      name: "Force Urbania",
      brandModel: "Force Urbania",
      year: "2025",
      seats: "13 Seats",
      transmission: "Manual",
      fuel: "Diesel",
      ratePerDay: "₹10,000",
      category: "tempo",
      tag: "Luxury Group Cruiser",
      image: "/img/urbania.png",
    },
  ];

  const filteredVehicles = activeTab === "all" 
    ? vehicles 
    : vehicles.filter((v) => v.category === activeTab);

  const whatsappNumber = "917002674473";
  const getVehicleWaLink = (v: Vehicle) => {
    const text = `Hi Borah Tour and Travels! I am interested in booking the *${v.name}* (${v.year} Model, ${v.seats}, ${v.fuel}) at ${v.ratePerDay}/day. Please let me know availability.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="vehicles" className="py-10 sm:py-20 bg-white border-t border-gray-200/60 font-manrope overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#1e4630] block mb-1">
              Our Premium Fleet
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">
              Available Vehicles
            </h2>
            <p className="text-gray-600 mt-1 text-xs sm:text-base max-w-xl">
              Choose from our clean, well-maintained fleet of Sedans, SUVs, and Tempo Travellers for your Northeast trip.
            </p>
          </div>

          {/* Filter Pills - Mobile Horizontal Scroll */}
          <div className="flex overflow-x-auto gap-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 bg-[#f7f8f4] p-1.5 rounded-2xl border border-gray-200 shrink-0">
            {[
              { id: "all", label: "All Vehicles" },
              { id: "sedan", label: "Sedans (5 Seats)" },
              { id: "suv", label: "SUVs (8 Seats)" },
              { id: "tempo", label: "Travellers (13 Seats)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? "bg-[#1e4630] text-[#c6f022] shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-between mb-2 px-1 text-xs font-bold text-[#1e4630] uppercase tracking-wider">
          <span>Our Vehicles</span>
          <span className="flex items-center gap-1 opacity-80 text-[11px]">Swipe →</span>
        </div>

        {/* Vehicles Cards Grid: Mobile Horizontal Carousel / Desktop Grid */}
        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {filteredVehicles.map((v) => (
            <div
              key={v.id}
              className="w-[86vw] max-w-[340px] sm:w-auto shrink-0 snap-center bg-[#f7f8f4] border border-gray-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
            >
              <div>
                {/* Header Tag & Price */}
                <div className="flex items-center justify-between mb-3">
                  {v.tag ? (
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#1e4630]/10 text-[#1e4630] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#1e4630]/15">
                      {v.tag}
                    </span>
                  ) : (
                    <div></div>
                  )}
                  <div className="text-right">
                    <span className="text-lg sm:text-2xl font-extrabold text-[#1e4630]">
                      {v.ratePerDay}
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-500 font-medium"> / day</span>
                  </div>
                </div>

                {/* Car Image Header Visual */}
                <div className="w-full h-40 sm:h-44 rounded-2xl bg-white border border-gray-200/80 overflow-hidden mb-4 flex items-center justify-center relative shadow-sm group-hover:border-[#1e4630]/30 transition-all duration-300">
                  {v.image ? (
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1e4630]/5 flex items-center justify-center">
                      <Car size={48} className="text-[#1e4630]" />
                    </div>
                  )}
                </div>

                {/* Title & Brand */}
                <h3 className="text-base sm:text-xl font-bold text-[#1c1716] group-hover:text-[#1e4630] transition-colors leading-tight mb-1">
                  {v.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-500 mb-4 font-medium">
                  {v.brandModel}
                </p>

                {/* Spec Pills */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-100 text-[11px] sm:text-xs font-medium text-gray-700">
                    <Users size={13} className="text-[#1e4630] shrink-0" />
                    <span>{v.seats}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-100 text-[11px] sm:text-xs font-medium text-gray-700">
                    <Calendar size={13} className="text-[#1e4630] shrink-0" />
                    <span>{v.year} Model</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-100 text-[11px] sm:text-xs font-medium text-gray-700">
                    <Gauge size={13} className="text-[#1e4630] shrink-0" />
                    <span>{v.transmission}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-100 text-[11px] sm:text-xs font-medium text-gray-700">
                    <Fuel size={13} className="text-[#1e4630] shrink-0" />
                    <span>{v.fuel}</span>
                  </div>
                </div>
              </div>

              {/* Book CTA */}
              <a
                href={getVehicleWaLink(v)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover w-full py-3 px-4 rounded-2xl bg-[#1e4630] text-[#c6f022] hover:bg-[#143624] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 decoration-none transition-colors active:scale-95 shadow-md cursor-pointer"
              >
                <MessageSquare size={16} />
                <span>Book This Vehicle</span>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
