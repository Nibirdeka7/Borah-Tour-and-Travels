"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = "+917002674473",
  message = "Hi Borah Tour and Travels! I would like to inquire about customized private tours and vehicle rates."
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(true);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3 font-manrope">
      
      {/* Sleek Tooltip / Chat Callout for Desktop */}
      {showTooltip && (
        <div className="hidden md:flex items-center gap-2.5 bg-[#1e4630] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-white/20 text-xs font-bold animate-bounce relative">
          <span>Chat directly on WhatsApp!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-white/60 hover:text-white transition-colors cursor-pointer p-0.5"
            aria-label="Close tooltip"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Floating Action Button (Mobile & Desktop) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 decoration-none cursor-pointer"
        aria-label="Chat with Borah Tours on WhatsApp"
        id="whatsapp-floating-btn"
      >
        {/* Pulsing Ambient Ring */}
        {/* <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75"></span> */}

        {/* Online Status Dot Indicator */}
        {/* <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full z-10"></span> */}

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md transition-transform duration-300 group-hover:rotate-12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
