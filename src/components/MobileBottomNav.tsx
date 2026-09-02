"use client";

import React from "react";
import { PhoneCall, MessageSquare, Sparkles } from "lucide-react";

interface MobileBottomNavProps {
  onOpenWizard: () => void;
}

export default function MobileBottomNav({ onOpenWizard }: MobileBottomNavProps) {
  const phoneNumber = "917002674473";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Hi Borah Tour and Travels, I would like to plan a tour to Northeast India. Please share details."
  )}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-gray-200/80 p-2.5 sm:hidden shadow-[0_-8px_25px_rgba(0,0,0,0.1)] transition-all font-manrope">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        
        {/* Quick Phone Call Button */}
        <a
          href={`tel:+${phoneNumber}`}
          aria-label="Call Driver & Coordinator"
          className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gray-100 text-[#1e4630] hover:bg-gray-200 transition-colors active:scale-95 shrink-0"
        >
          <PhoneCall size={18} />
        </a>

        {/* WhatsApp Direct Chat */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 flex-1 h-11 rounded-2xl bg-[#25D366] text-white font-bold text-xs shadow-md active:scale-95 transition-transform text-center decoration-none"
        >
          <MessageSquare size={16} />
          <span>WhatsApp</span>
        </a>

        {/* Custom Trip Wizard Launcher */}
        <button
          onClick={onOpenWizard}
          className="flex items-center justify-center gap-1.5 flex-1 h-11 rounded-2xl bg-[#1e4630] text-[#c6f022] font-bold text-xs shadow-md active:scale-95 transition-transform cursor-pointer"
        >
          <Sparkles size={15} />
          <span>Plan My Trip</span>
        </button>

      </div>
    </div>
  );
}
