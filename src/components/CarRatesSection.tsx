"use client";

import React, { useState, useRef } from "react";
import { CheckCircle2, Info, Fuel, ShieldCheck, UserCheck, Navigation, ParkingSquare, Ticket, ChevronDown, ChevronUp } from "lucide-react";

export default function CarRatesSection() {
  const [activeStateTab, setActiveStateTab] = useState<number>(1); // Default Meghalaya (index 1)
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ratesData = [
    {
      id: "assam",
      state: "Assam",
      subtitle: "Guwahati Local Sightseeing / Official Duty",
      tag: "Local & Official",
      rates: [
        { model: "Swift Dzire", price: "₹3,500", pax: "4-5 Seats" },
        { model: "Maruti Ertiga", price: "₹4,500", pax: "6-7 Seats" },
        { model: "Toyota Innova", price: "₹5,500", pax: "7-8 Seats" },
      ],
      popular: false,
    },
    {
      id: "meghalaya",
      state: "Meghalaya",
      subtitle: "As per Confirmed Itinerary per day cost",
      tag: "Most Popular",
      rates: [
        { model: "Swift Dzire", price: "₹4,000", pax: "4-5 Seats" },
        { model: "Maruti Ertiga", price: "₹5,000", pax: "6-7 Seats" },
        { model: "Toyota Innova", price: "₹6,000", pax: "7-8 Seats" },
      ],
      popular: true,
    },
    {
      id: "arunachal",
      state: "Arunachal",
      subtitle: "As per Confirmed Itinerary per day cost",
      tag: "Scenic Trails",
      rates: [
        { model: "Swift Dzire", price: "₹4,500", pax: "4-5 Seats" },
        { model: "Maruti Ertiga", price: "₹5,500", pax: "6-7 Seats" },
        { model: "Toyota Innova", price: "₹6,500", pax: "7-8 Seats" },
      ],
      popular: false,
    },
  ];

  const inclusions = [
    { icon: Navigation, label: "Toll Charges" },
    { icon: ParkingSquare, label: "Parking Fees" },
    { icon: UserCheck, label: "Driver Allowance" },
    { icon: Fuel, label: "Fuel Included" },
    { icon: ShieldCheck, label: "Vehicle Hiring" },
    { icon: Ticket, label: "All Sightseeing" },
  ];

  const notes = [
    "The above rates are per-day vehicle charges.",
    "Force Traveller Daily Rates: 13-Seater (₹10,000/day), 16-Seater (₹12,000/day), 25-Seater (₹14,000/day).",
    "Assam: Rates apply to Guwahati local sightseeing / official duty.",
    "Meghalaya & Arunachal: Rates apply as per confirmed itinerary.",
    "Rates include fuel, toll, parking, driver allowance, vehicle hiring charges, and sightseeing mentioned in itinerary.",
    "Any additional sightseeing, extra hours, route changes, or additional kilometres may be charged separately.",
    "Rates subject to vehicle availability and confirmation at time of booking.",
    "Hotel, food, entry tickets, adventure activities, and personal expenses are excluded unless specified.",
    "Final fare may vary depending on travel days and itinerary."
  ];

  const whatsappNumber = "917002674473";
  const getWaLink = (stateName: string) => {
    const text = `Hi Borah Tour and Travels! I want to check car rate details for ${stateName} tour.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const scrollToCard = (index: number) => {
    setActiveStateTab(index);
    if (scrollRef.current) {
      const cards = scrollRef.current.querySelectorAll<HTMLElement>(".rate-card");
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };

  return (
    <section id="car-rates" className="py-10 sm:py-20 bg-[#f7f8f4] border-t border-gray-200/80 font-manrope overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#1e4630] block mb-1">
            Transparent Per-Day Rates
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">
            Rate List of Cars
          </h2>
          <p className="text-gray-600 mt-1.5 text-xs sm:text-base leading-relaxed">
            Per-day vehicle hiring charges for Assam, Meghalaya, and Arunachal Pradesh. No hidden markup.
          </p>

          {/* Mobile Quick State Tabs Bar */}
          <div className="flex md:hidden items-center justify-center gap-1.5 mt-4 bg-white p-1 rounded-2xl border border-gray-200 shadow-sm max-w-xs mx-auto">
            {ratesData.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => scrollToCard(idx)}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStateTab === idx
                    ? "bg-[#1e4630] text-[#c6f022] shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item.state}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-between mb-2 px-1 text-xs font-bold text-[#1e4630] uppercase tracking-wider">
          <span>Rates by State</span>
          <span className="flex items-center gap-1 opacity-80 text-[11px]">Swipe →</span>
        </div>

        {/* 3 State Cards Container: Mobile Horizontal Swipe Carousel / Desktop Grid */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 mb-8 sm:mb-12"
        >
          {ratesData.map((item, idx) => (
            <div
              key={item.id}
              className={`rate-card w-[86vw] max-w-[340px] sm:w-auto shrink-0 snap-center relative rounded-3xl p-5 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                item.popular
                  ? "bg-[#1e4630] text-white shadow-xl border-2 border-[#c6f022]"
                  : "bg-white text-[#1c1716] border border-gray-200/90 shadow-sm hover:shadow-md"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      item.popular
                        ? "bg-[#c6f022] text-[#1e4630]"
                        : "bg-[#1e4630]/10 text-[#1e4630]"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className={`text-[11px] sm:text-xs font-semibold ${item.popular ? "text-white/70" : "text-gray-500"}`}>
                    Per Day Cost
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-bold mb-1 ${item.popular ? "text-white" : "text-[#1c1716]"}`}>
                  {item.state}
                </h3>
                <p className={`text-xs mb-5 sm:mb-6 leading-normal ${item.popular ? "text-white/80" : "text-gray-500"}`}>
                  {item.subtitle}
                </p>

                {/* Car Prices List */}
                <div className="space-y-2.5 sm:space-y-3.5 mb-6">
                  {item.rates.map((rate) => (
                    <div
                      key={rate.model}
                      className={`flex items-center justify-between p-3 rounded-2xl ${
                        item.popular
                          ? "bg-white/10 border border-white/15"
                          : "bg-[#f7f8f4] border border-gray-100"
                      }`}
                    >
                      <div>
                        <div className={`font-bold text-sm sm:text-base ${item.popular ? "text-white" : "text-[#1c1716]"}`}>
                          {rate.model}
                        </div>
                        <div className={`text-[10px] sm:text-[11px] ${item.popular ? "text-white/70" : "text-gray-500"}`}>
                          {rate.pax}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-extrabold text-base sm:text-xl ${item.popular ? "text-[#c6f022]" : "text-[#1e4630]"}`}>
                          {rate.price}
                        </div>
                        <div className={`text-[10px] ${item.popular ? "text-white/60" : "text-gray-400"}`}>
                          / day
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={getWaLink(item.state)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm active:scale-95 transition-all decoration-none flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  item.popular
                    ? "bg-[#c6f022] text-[#1e4630] hover:bg-white"
                    : "bg-[#1e4630] text-white hover:bg-[#143624]"
                }`}
              >
                <span>Book {item.state} Vehicle</span>
              </a>
            </div>
          ))}
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
