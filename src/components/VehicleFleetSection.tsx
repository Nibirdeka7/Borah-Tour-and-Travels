"use client";

import React, { useState } from "react";
import {
  Users,
  Fuel as FuelIcon,
  Calendar,
  Gauge,
  Car,
  MessageSquare,
  CheckCircle2,
  Info,
  ShieldCheck,
  UserCheck,
  Navigation,
  ParkingSquare,
  Ticket,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export interface SeatOption {
  seats: string;       // e.g. "13 Seats"
  ratePerDay: string;  // e.g. "₹10,000"
  label: string;       // e.g. "13 Seater"
}

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
  seatOptions?: SeatOption[];
}

interface VehicleFleetSectionProps {
  items?: Vehicle[];
}

export default function VehicleFleetSection({ items }: VehicleFleetSectionProps = {}) {
  const [activeTab, setActiveTab] = useState<"all" | "sedan" | "suv" | "tempo">("all");
  const [selectedSeats, setSelectedSeats] = useState<Record<string, SeatOption>>({});
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const defaultVehicles: Vehicle[] = [
    {
      id: "dzire-2026",
      name: "Maruti Suzuki Swift Dzire",
      brandModel: "Maruti Suzuki",
      year: "New Model",
      seats: "5 Seats",
      transmission: "Manual",
      fuel: "Petrol",
      ratePerDay: "₹4,000",
      category: "sedan",
      tag: "Latest Edition",
      image: "/img/vehicles/marutiSuzukiSwiftDezire1.png",
    },
    {
      id: "ertiga-2025",
      name: "Maruti Suzuki Ertiga",
      brandModel: "Maruti Suzuki Ertiga",
      year: "New Model",
      seats: "8 Seats",
      transmission: "Manual",
      fuel: "Petrol",
      ratePerDay: "₹5,500",
      category: "suv",
      tag: "Family Favorite",
      image: "/img/vehicles/ertiga.png",
    },
    {
      id: "innova-crysta",
      name: "Toyota Innova Crysta",
      brandModel: "Toyota Crysta",
      year: "New Model",
      seats: "8 Seats",
      transmission: "Manual",
      fuel: "Diesel",
      ratePerDay: "₹6,500",
      category: "suv",
      tag: "Premium Comfort",
      image: "/img/vehicles/innovaCrysta.png",
    },
    {
      id: "traveller-2024",
      name: "Force Traveller",
      brandModel: "Force Motors",
      year: "New Model",
      seats: "13 Seats",
      transmission: "Manual",
      fuel: "Diesel",
      ratePerDay: "₹10,000",
      category: "tempo",
      tag: "Group Tour Special",
      image: "/img/vehicles/traveller.png",
      seatOptions: [
        { label: "13 Seater", seats: "13 Seats", ratePerDay: "₹9,000" },
        { label: "16 Seater", seats: "16 Seats", ratePerDay: "₹10,000" },
        { label: "25 Seater", seats: "25 Seats", ratePerDay: "₹11,000" },
      ],
    },
    {
      id: "urbania-2025",
      name: "Force Urbania",
      brandModel: "Force Motors Luxury",
      year: "New Model",
      seats: "13 Seats",
      transmission: "Manual",
      fuel: "Diesel",
      ratePerDay: "₹12,000",
      category: "tempo",
      tag: "Luxury Group Cruiser",
      image: "/img/vehicles/urbania.png",
      seatOptions: [
        { label: "13 Seater", seats: "13 Seats", ratePerDay: "₹12,000" }
      ],
    },
  ];

  const inclusions = [
    { icon: Navigation, label: "Toll Charges" },
    { icon: ParkingSquare, label: "Parking Fees" },
    { icon: UserCheck, label: "Driver Allowance" },
    { icon: FuelIcon, label: "Fuel Included" },
    { icon: ShieldCheck, label: "Vehicle Hiring" },
    { icon: Ticket, label: "All Sightseeing" },
  ];

  const notes = [
    "The above rates are per-day vehicle charges.",
    "Force Traveller Daily Rates: 13-Seater (₹9,000/day), 16-Seater (₹10,000/day), 25-Seater (₹11,000/day).",
    "Assam: Rates apply to Guwahati local sightseeing / official duty.",
    "Meghalaya & Arunachal: Rates apply as per confirmed itinerary.",
    "Rates include fuel, toll, parking, driver allowance, vehicle hiring charges, and sightseeing mentioned in itinerary.",
    "Any additional sightseeing, extra hours, route changes, or additional kilometres may be charged separately.",
    "Rates subject to vehicle availability and confirmation at time of booking.",
    "Hotel, food, entry tickets, adventure activities, and personal expenses are excluded unless specified.",
    "Final fare may vary depending on travel days and itinerary."
  ];

  const vehicles = items && items.length > 0 ? items : defaultVehicles;

  const filteredVehicles = activeTab === "all" 
    ? vehicles 
    : vehicles.filter((v) => v.category === activeTab);

  const whatsappNumber = "917002674473";
  
  const getVehicleWaLink = (v: Vehicle, currentSeat?: SeatOption) => {
    const seatText = currentSeat ? ` (${currentSeat.label})` : "";
    const rateText = currentSeat ? currentSeat.ratePerDay : v.ratePerDay;
    const capacityText = currentSeat ? currentSeat.seats : v.seats;
    const modelText = v.year && v.year.includes("Model") ? v.year : "New Model";
    
    const text = `Hi Borah Tour and Travels! I am interested in booking the *${v.name}${seatText}* (${modelText}, ${capacityText}, ${v.fuel}) at ${rateText}/day. Please let me know availability.`;
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
              { id: "tempo", label: "Travellers (13-25 Seats)" },
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
        <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 mb-10 sm:mb-14">
          {filteredVehicles.map((v) => {
            const activeSeatOption = v.seatOptions
              ? selectedSeats[v.id] || v.seatOptions[0]
              : undefined;

            const currentRate = activeSeatOption ? activeSeatOption.ratePerDay : v.ratePerDay;
            const currentSeats = activeSeatOption ? activeSeatOption.seats : v.seats;

            return (
              <div
                key={v.id}
                className="w-[86vw] max-w-[340px] sm:w-auto shrink-0 snap-center bg-[#f7f8f4] border border-gray-200/80 rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  {/* Header Tag & Dynamic Price */}
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
                        {currentRate}
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
                  <p className="text-[11px] sm:text-xs text-gray-500 mb-3 font-medium">
                    {v.brandModel}
                  </p>

                  {/* Seater Variant Selector (For Force Traveller & Force Urbania) */}
                  {v.seatOptions && activeSeatOption && (
                    <div className="mb-4 bg-white p-2.5 rounded-2xl border border-gray-200/90 shadow-sm space-y-1.5">
                      <div className="flex items-center justify-between px-0.5 text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <span>Select Seater Capacity:</span>
                        <span className="text-[#1e4630] font-extrabold">{activeSeatOption.label}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5">
                        {v.seatOptions.map((option) => {
                          const isSelected = activeSeatOption.seats === option.seats;
                          return (
                            <button
                              key={option.seats}
                              type="button"
                              onClick={() =>
                                setSelectedSeats((prev) => ({
                                  ...prev,
                                  [v.id]: option,
                                }))
                              }
                              className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                                isSelected
                                  ? "bg-[#1e4630] text-[#c6f022] shadow-sm ring-2 ring-[#c6f022]"
                                  : "bg-[#f7f8f4] text-gray-700 hover:bg-gray-200/70"
                              }`}
                            >
                              <div className="text-[11px] sm:text-xs font-bold leading-tight">{option.label}</div>
                              <div
                                className={`text-[10px] font-medium mt-0.5 ${
                                  isSelected ? "text-[#c6f022]" : "text-gray-500"
                                }`}
                              >
                                {option.ratePerDay}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Spec Pills */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-100 text-[11px] sm:text-xs font-semibold text-[#1e4630]">
                      <Users size={13} className="text-[#1e4630] shrink-0" />
                      <span>{currentSeats}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-100 text-[11px] sm:text-xs font-medium text-gray-700">
                      <Calendar size={13} className="text-[#1e4630] shrink-0" />
                      <span>{v.year && v.year.includes("Model") ? v.year : "New Model"}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-100 text-[11px] sm:text-xs font-medium text-gray-700">
                      <Gauge size={13} className="text-[#1e4630] shrink-0" />
                      <span>{v.transmission}</span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-xl border border-gray-100 text-[11px] sm:text-xs font-medium text-gray-700">
                      <FuelIcon size={13} className="text-[#1e4630] shrink-0" />
                      <span>{v.fuel}</span>
                    </div>
                  </div>
                </div>

                {/* Book CTA */}
                <a
                  href={getVehicleWaLink(v, activeSeatOption)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hover w-full py-3 px-4 rounded-2xl bg-[#1e4630] text-[#c6f022] hover:bg-[#143624] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 decoration-none transition-colors active:scale-95 shadow-md cursor-pointer"
                >
                  <MessageSquare size={16} />
                  <span>
                    Book {activeSeatOption ? activeSeatOption.label : v.name}
                  </span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Package Inclusions Grid */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-200/80 shadow-sm mb-6 sm:mb-12">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <ShieldCheck size={20} className="text-[#1e4630]" />
            <h3 className="text-lg sm:text-2xl font-bold text-[#1c1716]">
              Included in Daily Vehicle Rates
            </h3>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-4">
            {inclusions.map((inc, idx) => {
              const IconComp = inc.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#f7f8f4] border border-gray-100 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center text-center space-y-1.5 sm:space-y-2.5 hover:border-[#1e4630]/30 transition-colors"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1e4630]/10 flex items-center justify-center text-[#1e4630] shrink-0">
                    <IconComp size={16} className="sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#1c1716] leading-tight">
                    {inc.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Rate Notes Accordion for Mobile / Clean Box for Desktop */}
        <div className="bg-[#1e4630]/5 border border-[#1e4630]/15 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
          <div
            onClick={() => setShowNotes(!showNotes)}
            className="flex items-center justify-between cursor-pointer sm:cursor-default"
          >
            <div className="flex items-center gap-2">
              <Info size={18} className="text-[#1e4630] shrink-0" />
              <h4 className="text-base sm:text-lg font-bold text-[#1c1716]">
                Important Notes &amp; Policies
              </h4>
            </div>

            {/* Mobile Accordion Toggle Icon */}
            <button className="sm:hidden text-[#1e4630] font-bold p-1">
              {showNotes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>

          {/* Notes Content: Always visible on sm+, toggleable on mobile */}
          <div className={`${showNotes ? "block" : "hidden sm:block"} mt-4 pt-3 border-t border-[#1e4630]/10`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
              {notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <CheckCircle2 size={15} className="text-[#1e4630] shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
