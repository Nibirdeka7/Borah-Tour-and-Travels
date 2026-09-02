"use client";

import React from "react";
import { CheckCircle2, Info, Fuel, ShieldCheck, UserCheck, Navigation, ParkingSquare, Ticket } from "lucide-react";

export default function CarRatesSection() {
  const ratesData = [
    {
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
    { icon: Fuel, label: "Fuel Cost Included" },
    { icon: ShieldCheck, label: "Vehicle Hiring Charge" },
    { icon: Ticket, label: "All Sightseeing as per Itinerary" },
  ];

  const notes = [
    "The above rates are per-day vehicle charges.",
    "Assam: Rates apply to Guwahati local sightseeing / official duty.",
    "Meghalaya & Arunachal: Rates apply as per the confirmed itinerary.",
    "Rates include fuel, toll, parking, driver allowance, vehicle hiring charges, and sightseeing mentioned in the itinerary.",
    "Any additional sightseeing, extra hours, route changes, or additional kilometres may be charged separately.",
    "Rates are subject to vehicle availability and confirmation at the time of booking.",
    "Hotel, food, entry tickets, adventure activities, and personal expenses are not included unless specified in the package.",
    "Final fare may vary depending on the number of travel days and itinerary."
  ];

  const whatsappNumber = "917002674473";
  const getWaLink = (stateName: string) => {
    const text = `Hi Borah Tour and Travels! I want to check car rate details for ${stateName} tour.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="car-rates" className="py-12 sm:py-20 bg-[#f7f8f4] border-t border-gray-200/80 font-manrope">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] block mb-1">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1c1716] tracking-tight">
            Rate List of Cars
          </h2>
          <p className="text-gray-600 mt-2 text-xs sm:text-base leading-relaxed">
            Per-day vehicle hiring rates for Assam, Meghalaya, and Arunachal Pradesh. Direct local rates with no hidden fees.
          </p>
        </div>

        {/* 3 State Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {ratesData.map((item) => (
            <div
              key={item.state}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                item.popular
                  ? "bg-[#1e4630] text-white shadow-xl scale-[1.02] border-2 border-[#c6f022]"
                  : "bg-white text-[#1c1716] border border-gray-200 shadow-sm hover:shadow-md"
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
                  <span className={`text-xs font-semibold ${item.popular ? "text-white/70" : "text-gray-500"}`}>
                    Per Day Cost
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-bold mb-1 ${item.popular ? "text-white" : "text-[#1c1716]"}`}>
                  {item.state}
                </h3>
                <p className={`text-xs mb-6 ${item.popular ? "text-white/80" : "text-gray-500"}`}>
                  {item.subtitle}
                </p>

                {/* Car Prices List */}
                <div className="space-y-3.5 mb-6">
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
                        <div className={`text-[11px] ${item.popular ? "text-white/70" : "text-gray-500"}`}>
                          {rate.pax}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-extrabold text-lg sm:text-xl ${item.popular ? "text-[#c6f022]" : "text-[#1e4630]"}`}>
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
                className={`w-full text-center py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all decoration-none flex items-center justify-center gap-2 cursor-pointer ${
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-12">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck size={22} className="text-[#1e4630]" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#1c1716]">
              Package Included in Daily Rates
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {inclusions.map((inc, idx) => {
              const IconComp = inc.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#f7f8f4] border border-gray-100 p-4 rounded-2xl flex flex-col items-center text-center space-y-2.5 hover:border-[#1e4630]/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1e4630]/10 flex items-center justify-center text-[#1e4630]">
                    <IconComp size={20} />
                  </div>
                  <span className="text-xs font-bold text-[#1c1716] leading-tight">
                    {inc.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Important Rate Notes */}
        <div className="bg-[#1e4630]/5 border border-[#1e4630]/15 rounded-3xl p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} className="text-[#1e4630]" />
            <h4 className="text-lg font-bold text-[#1c1716]">Important Notes About Rates</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notes.map((note, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <CheckCircle2 size={16} className="text-[#1e4630] shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
