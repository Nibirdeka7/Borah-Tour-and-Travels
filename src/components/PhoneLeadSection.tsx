"use client";

import React, { useState } from "react";
import { Loader2, ArrowRight, PhoneCall, CheckCircle } from "lucide-react";

export default function PhoneLeadSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate callback dispatch or direct WhatsApp redirect
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      const message = `Hi Borah Tours, please call me back at ${phoneNumber} regarding tour packages.`;
      const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");

      setTimeout(() => {
        setSubmitted(false);
        setPhoneNumber("");
      }, 5000);
    }, 1200);
  };

  const img1 = "/img/cerrapunji.png";
  const img2 = "/img/shillong.png";

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f8f4] font-manrope">
      <div className="w-full max-w-[1264px] mx-auto relative min-h-[500px] lg:h-[580px] flex flex-col lg:block">
        
        {/* Mobile View */}
        <div className="flex flex-col lg:hidden gap-8 p-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] mb-2 block">
              Instant Callback Support
            </span>
            <h2 className="font-bold text-[32px] leading-[1.2] tracking-[-1px] text-[#1c1716] mb-4">
              Explore With Ease, Plan With Confidence
            </h2>
            <p className="font-normal text-[16px] leading-[1.55] text-[#1c1716]/80 mb-6">
              Thousands of travelers have embraced authentic Northeast tours with our local drivers. Enter your phone number and we’ll call you back instantly to plan your itinerary.
            </p>
          </div>

          <div className="rounded-[24px] overflow-hidden w-full aspect-[4/3] shadow-md">
            <img
              alt="Meghalaya Waterfalls"
              className="w-full h-full object-cover"
              src={img1}
            />
          </div>

          <div className="relative bg-[#ebeeed] rounded-[34px] p-8 flex flex-col items-center gap-6 shadow-sm border border-black/5">
            <div className="relative w-[180px] h-[180px] rounded-[20px] overflow-hidden shadow-inner">
              <img
                alt="Dawki Crystal River"
                className="w-full h-full object-cover"
                src={img2}
              />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-4">
              <div className="w-full relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="border-[#1c1716] border-[1.2px] border-solid w-full h-[52px] rounded-[34px] px-6 bg-white text-[16px] placeholder:text-[rgba(28,23,22,0.55)] focus:outline-none focus:ring-2 focus:ring-[#1e4630]"
                />
              </div>

              {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
              {submitted && (
                <p className="text-green-700 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle size={14} />
                  <span>Thanks! We will call you back shortly.</span>
                </p>
              )}

              <button
                type="submit"
                disabled={loading || submitted}
                className="btn-hover bg-[#c6f022] text-[#1e4630] font-bold flex gap-2 h-[52px] items-center justify-center px-8 rounded-[35px] w-full hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-md"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : submitted ? (
                  <span>Request Received!</span>
                ) : (
                  <>
                    <span>Request Callback</span>
                    <PhoneCall size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block relative w-full h-full">
          {/* Left Image Frame */}
          <div className="absolute left-0 top-0 w-[38%] h-[540px] rounded-[28px] overflow-hidden shadow-xl border border-black/5">
            <img
              alt="Meghalaya Scenery"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              src={img1}
            />
          </div>

          {/* Center Form & Banner Text */}
          <div className="absolute left-[44%] top-[80px] w-[500px] xl:w-[540px] flex flex-col gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#1e4630] mb-2 block">
                Instant Callback Service
              </span>
              <h2 className="font-bold leading-[1.15] text-[#1c1716] text-[42px] tracking-[-1.2px] mb-4">
                Explore With Ease, Plan With Confidence
              </h2>
              <p className="font-normal leading-[1.6] text-[#1c1716]/80 text-[16px]">
                Thousands of travelers have experienced raw nature in Meghalaya & Assam with Borah Tours. Drop your phone number below and our lead coordinator will call you in 15 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="relative w-full max-w-[600px] h-[64px] border-[#1c1716] border-[1.2px] bg-white rounded-[34px] flex items-center p-2 pl-6 gap-3 shadow-md focus-within:ring-2 focus-within:ring-[#1e4630]">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number (e.g. 9876543210)"
                  className="flex-grow bg-transparent border-none outline-none text-[15px] text-[#1c1716] placeholder:text-[rgba(28,23,22,0.55)] h-full"
                />
                <button
                  type="submit"
                  disabled={loading || submitted}
                  className="btn-hover bg-[#c6f022] text-[#1e4630] font-bold flex gap-2 h-[48px] items-center justify-center px-7 rounded-[35px] cursor-pointer hover:opacity-90 transition-opacity shrink-0 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : submitted ? (
                    <span>Request Sent!</span>
                  ) : (
                    <>
                      <span>Get Call Back</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>

              {error && <p className="text-red-500 text-xs font-semibold ml-4">{error}</p>}
              {submitted && (
                <p className="text-green-700 text-xs font-bold ml-4 flex items-center gap-1">
                  <CheckCircle size={14} />
                  <span>Request received! We will call you back shortly.</span>
                </p>
              )}
            </form>
          </div>

          {/* Right Floating Image Frame */}
          <div className="absolute right-0 top-0 rounded-[28px] size-[180px] overflow-hidden shadow-xl border-4 border-white">
            <img
              alt="Dawki River"
              className="w-full h-full object-cover scale-125 hover:scale-135 transition-transform duration-700"
              src={img2}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
