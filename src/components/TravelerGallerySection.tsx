"use client";

import React, { useState } from "react";
import { X, MessageSquare, Maximize2 } from "lucide-react";

export default function TravelerGallerySection() {
  const galleryImages = [
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.45 PM.jpeg", id: "img-1" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.45 PM (1).jpeg", id: "img-2" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.46 PM.jpeg", id: "img-3" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.47 PM.jpeg", id: "img-4" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.47 PM (1).jpeg", id: "img-5" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.48 PM.jpeg", id: "img-6" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.48 PM (1).jpeg", id: "img-7" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.49 PM.jpeg", id: "img-8" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.49 PM (1).jpeg", id: "img-9" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.49 PM (2).jpeg", id: "img-10" },
    { src: "/gallery/WhatsApp Image 2026-09-03 at 6.19.50 PM.jpeg", id: "img-11" }
  ];

  const row1 = galleryImages.slice(0, 6);
  const row2 = galleryImages.slice(5, 11);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const whatsappUrl = `https://wa.me/917002674473?text=${encodeURIComponent(
    "Hi Borah Tour and Travels! I saw this beautiful travel photo in your gallery and would like to book a similar private tour."
  )}`;

  return (
    <section id="gallery" className="py-8 sm:py-16 bg-[#f7f8f4] font-manrope border-t border-gray-200/80 relative overflow-hidden pause-marquee">
      
      {/* DUAL-DIRECTION INFINITE MARQUEE SECTION */}
      <div className="w-full flex flex-col gap-3 sm:gap-4">
        
        {/* ROW 1: MOVES LEFT */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-[200%] animate-marquee-left gap-3 sm:gap-4 will-change-transform">
            {[...row1, ...row1, ...row1].map((img, idx) => (
              <div
                key={`left-${idx}`}
                onClick={() => setSelectedImage(img.src)}
                className="w-52 sm:w-80 h-36 sm:h-52 shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm sm:shadow-md border border-black/5 hover:scale-105 active:scale-95 transition-transform duration-300 bg-[#1e4630]"
              >
                <img
                  src={img.src}
                  alt="Northeast Tour Photo"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: MOVES RIGHT */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-[200%] animate-marquee-right gap-3 sm:gap-4 will-change-transform">
            {[...row2, ...row2, ...row2].map((img, idx) => (
              <div
                key={`right-${idx}`}
                onClick={() => setSelectedImage(img.src)}
                className="w-52 sm:w-80 h-36 sm:h-52 shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm sm:shadow-md border border-black/5 hover:scale-105 active:scale-95 transition-transform duration-300 bg-[#1e4630]"
              >
                <img
                  src={img.src}
                  alt="Northeast Tour Photo"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MOBILE-OPTIMIZED ENLARGED PHOTO LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 font-manrope animate-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl max-w-xl w-full p-4 sm:p-6 shadow-2xl overflow-hidden flex flex-col items-center gap-4 border border-gray-100"
          >
            
            {/* Close Button - Touch Friendly */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-30 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer hover:bg-black active:scale-90 transition-all shadow-lg"
              aria-label="Close preview"
            >
              <X size={20} />
            </button>

            {/* Enlarged Photo */}
            <div className="relative w-full max-h-[60vh] sm:max-h-[68vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Enlarged Tour Photo"
                className="w-full h-full max-h-[60vh] sm:max-h-[68vh] object-contain"
              />
            </div>

            {/* Direct Booking CTA Button - Touch Friendly */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hover w-full min-h-[50px] py-3.5 px-5 rounded-2xl bg-[#1e4630] text-[#c6f022] hover:bg-[#143624] active:scale-98 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 decoration-none shadow-xl cursor-pointer transition-all"
            >
              <MessageSquare size={19} />
              <span>Book Similar Private Tour</span>
            </a>

          </div>
        </div>
      )}

    </section>
  );
}
