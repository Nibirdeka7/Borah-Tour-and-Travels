"use client";

import React, { useState, useRef } from "react";

export default function CarRatesSection() {
  const [activeStateTab, setActiveStateTab] = useState<number>(1); // Default Meghalaya (index 1)
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
          className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6"
        >
          {ratesData.map((item) => (
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

      </div>
    </section>
  );
}
