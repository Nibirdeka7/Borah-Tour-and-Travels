"use client";

import React, { useState, useEffect } from "react";

export default function PagePreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Smooth, natural progress flow
    const timer1 = setTimeout(() => setProgress(55), 250);
    const timer2 = setTimeout(() => setProgress(88), 650);
    const timer3 = setTimeout(() => setProgress(100), 1050);

    // Smooth unmount
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(loadTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#1e4630] text-white flex flex-col items-center justify-center font-manrope overflow-hidden transition-opacity duration-800 ease-out ${
        loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Radial Dots & Ambient Lime Glow (Restored earlier background) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#c6f022 0.85px, transparent 0.85px)",
          backgroundSize: "28px 28px"
        }}
      ></div>
      <div className="absolute w-96 h-96 rounded-full bg-[#c6f022]/15 blur-3xl animate-pulse-glow pointer-events-none"></div>

      {/* Main Humanized Preloader Card */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm">
        
        {/* Soft Organic Brand Medallion */}
        <div className="relative mb-6">
          {/* Subtle Outer Ripple Ring */}
          <div className="absolute -inset-3 rounded-full border border-white/10 animate-ping opacity-25"></div>
          
          {/* Brand Logo Container */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center">
            <img
              src="/img/branding/logoHero.png"
              alt="Borah Tour & Travels"
              className="w-full h-full object-cover rounded-full shadow-inner"
            />
          </div>
        </div>

        {/* Humanized Brand Title */}
        <div className="space-y-1 mb-5">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display-lg">
            Borah Tour &amp; Travels
          </h1>
          <p className="text-xs text-[#c6f022]/90 font-medium tracking-wide">
            Authentically North East
          </p>
        </div>

        {/* Soft Smooth Progress Line */}
        <div className="w-44 sm:w-56 h-[3px] rounded-full bg-white/10 overflow-hidden relative mb-3 border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#c6f022]/80 via-[#c6f022] to-[#c6f022] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Soft Welcoming Subtitle */}
        <p className="text-[11px] sm:text-xs text-white/70 font-normal tracking-wide">
          Preparing your customized journey...
        </p>

      </div>
    </div>
  );
}
