"use client";

import React, { useState } from "react";
import { X, Clock, MapPin, CheckCircle, MessageSquare, Sparkles, Compass, ShieldCheck, Phone, Image as ImageIcon } from "lucide-react";

export interface ItineraryStep {
  day: string;
  title: string;
  overnight: string;
  description: string;
  highlights: string[];
}

export interface PackageData {
  id: string;
  title: string;
  price: string;
  duration: string;
  image: string;
  gallery?: string[];
  categories: string[];
  highlights: string[];
  route: string;
  activityLevel: string;
  groupSize: string;
  itinerary: ItineraryStep[];
}

interface PackageDetailModalProps {
  pkg: PackageData | null;
  onClose: () => void;
  onCustomize: (packageTitle: string) => void;
}

export default function PackageDetailModal({
  pkg,
  onClose,
  onCustomize,
}: PackageDetailModalProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!pkg) return null;

  const currentCoverImage = activeImage || pkg.image;

  const waMessage = `Hi Borah Tour and Travels! I want to inquire about the private tour package:
- *Package:* ${pkg.title}
- *Duration:* ${pkg.duration}
- *Route:* ${pkg.route}
- *Pace:* ${pkg.activityLevel}

Please share direct owner pricing and vehicle availability details!`;
  const waLink = `https://wa.me/917002674473?text=${encodeURIComponent(waMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setActiveImage(null);
          onClose();
        }
      }}
    >
      <div className="bg-white w-full max-w-3xl h-[92vh] sm:h-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col rounded-t-[28px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in border-t sm:border border-black/10 font-manrope relative">
        
        {/* Banner Cover Image */}
        <div className="relative h-48 sm:h-72 w-full overflow-hidden bg-[#1e4630] shrink-0 transition-all duration-500">
          <img
            src={currentCoverImage}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={() => {
              setActiveImage(null);
              onClose();
            }}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer z-20"
          >
            <X size={18} />
          </button>

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1.5 sm:gap-2 z-10">
            <span className="bg-[#c6f022] text-[#1e4630] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
              <Phone size={11} />
              Contact Direct
            </span>
            <span className="bg-white/90 text-[#1e4630] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Clock size={12} />
              {pkg.duration}
            </span>
          </div>

          {/* Title & Quick Info */}
          <div className="absolute bottom-3 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight leading-tight">
              {pkg.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-medium text-white/90">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-[#c6f022]" />
                {pkg.route}
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <Compass size={13} className="text-[#c6f022]" />
                Pace: {pkg.activityLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1 space-y-6 scroll-smooth">
          
          {/* Destination Gallery Thumbnails */}
          {pkg.gallery && pkg.gallery.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#1e4630]">
                <span className="flex items-center gap-1.5">
                  <ImageIcon size={14} />
                  Destination Gallery ({pkg.gallery.length} Photos)
                </span>
                <span className="text-[10px] text-gray-500 font-normal">Click photo to preview</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {pkg.gallery.map((imgUrl, gIdx) => (
                  <button
                    key={gIdx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                      currentCoverImage === imgUrl ? "border-[#c6f022] scale-95 shadow-md" : "border-gray-200 hover:border-[#1e4630]"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${pkg.title} gallery ${gIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="bg-[#f7f8f4] p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-black/5 space-y-2.5">
            <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#1e4630]">
              Package Key Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {pkg.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-medium text-gray-800">
                  <CheckCircle size={14} className="text-[#1e4630] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Day-by-Day Itinerary */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-bold text-[#1c1716] flex items-center gap-2">
              <span>Complete Day-by-Day Itinerary</span>
            </h3>

            <div className="space-y-5 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
              {pkg.itinerary.map((step, idx) => (
                <div key={idx} className="relative pl-8 sm:pl-9 space-y-1.5">
                  
                  {/* Step Dot */}
                  <div className="absolute left-0 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1e4630] text-[#c6f022] text-[11px] sm:text-xs font-bold flex items-center justify-center shadow-md">
                    {idx + 1}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#1c1716]">
                      <span className="text-[#1e4630] font-semibold mr-1.5">{step.day}:</span>
                      {step.title}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      Overnight: {step.overnight}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {step.highlights && step.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {step.highlights.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded-md border border-emerald-200"
                        >
                          <ShieldCheck size={10} />
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Direct Contact & Inclusions Note */}
          <div className="p-3.5 sm:p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 leading-relaxed space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-emerald-950">
              <Phone size={13} className="text-[#1e4630]" />
              Direct Owner Rates – No Middleman Commission:
            </p>
            <p className="text-emerald-800">
              Pricing depends on group size, vehicle choice, and stay preferences. Contact the owner directly for instant custom quotes and exact seasonal discounts.
            </p>
          </div>
        </div>

        {/* Modal Sticky Footer CTAs */}
        <div className="p-3.5 sm:p-6 bg-white border-t border-gray-100 flex flex-row items-center gap-2.5 justify-between shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-20">
          <button
            onClick={() => {
              setActiveImage(null);
              onClose();
              onCustomize(pkg.title);
            }}
            className="flex-1 py-3 px-3 rounded-xl border-2 border-[#1e4630] text-[#1e4630] font-bold text-xs hover:bg-[#1e4630] hover:text-[#c6f022] transition-colors cursor-pointer text-center"
          >
            Customize Itinerary
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hover flex-1 py-3 px-3 rounded-xl bg-[#c6f022] text-[#1e4630] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:opacity-95 transition-all text-center decoration-none cursor-pointer"
          >
            <MessageSquare size={16} />
            <span>Contact Owner Directly</span>
          </a>
        </div>
      </div>
    </div>
  );
}

