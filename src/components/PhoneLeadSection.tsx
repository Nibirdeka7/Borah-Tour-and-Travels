"use client";

import React, { useState, useEffect } from "react";
import { Loader2, ArrowRight, PhoneCall, CheckCircle, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export default function PhoneLeadSection() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Slideshow Destinations Array (Starting with Cherrapunji followed by 6 more)
  const slideshowImages = [
    {
      src: "/img/cherrapunji/cerrapunji.png",
      title: "Cherrapunji Nohkalikai Falls",
      location: "Cherrapunji, Meghalaya"
    },
    {
      src: "/img/kaziranga/kaziranga.png",
      title: "Kaziranga National Park",
      location: "Kaziranga, Assam"
    },
    {
      src: "/img/dawki/bac 3.png",
      title: "Dawki Umngot River",
      location: "Dawki, Meghalaya"
    },
    {
      src: "/img/tawang/tawang.png",
      title: "Tawang Monastery & Peaks",
      location: "Tawang, Arunachal Pradesh"
    },
    {
      src: "/img/cherrapunji/bac 1.png",
      title: "Double Decker Living Root Bridge",
      location: "Nongriat, Meghalaya"
    },
    {
      src: "/img/guwahati/guwahati.png",
      title: "Kamakhya & Brahmaputra Sunset",
      location: "Guwahati, Assam"
    },
    {
      src: "/img/panimur/panimur.png",
      title: "Panimur Waterfalls",
      location: "Dima Hasao, Assam"
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Auto-play slideshow timer every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [slideshowImages.length]);

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slideshowImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      const message = `Hi Borah Tour and Travels, please call me back at ${phoneNumber} regarding tour packages & vehicle rates.`;
      const waUrl = `https://wa.me/917002674473?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");

      setTimeout(() => {
        setSubmitted(false);
        setPhoneNumber("");
      }, 5000);
    }, 1200);
  };

  const img2 = "/img/shillong/shillong.png";

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

          {/* Mobile Slideshow Container */}
          <div className="relative rounded-[24px] overflow-hidden w-full aspect-[4/3] shadow-md group">
            <img
              key={slideshowImages[currentSlideIndex].src}
              alt={slideshowImages[currentSlideIndex].title}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              src={slideshowImages[currentSlideIndex].src}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

            {/* Location Tag */}
            <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
              <MapPin size={12} className="text-[#c6f022]" />
              <span>{slideshowImages[currentSlideIndex].location}</span>
            </div>

            {/* Slide Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-black/60"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-black/60"
            >
              <ChevronRight size={18} />
            </button>

            {/* Slide Indicator Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 z-10">
              {slideshowImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlideIndex === idx ? "w-6 bg-[#c6f022]" : "w-1.5 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative bg-[#ebeeed] rounded-[34px] p-8 flex flex-col items-center gap-6 shadow-sm border border-black/5">
            <div className="relative w-[180px] h-[180px] rounded-[20px] overflow-hidden shadow-inner">
              <img
                alt="Shillong Scenery"
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
          {/* Left Image Slideshow Frame */}
          <div className="absolute left-0 top-0 w-[38%] h-[540px] rounded-[28px] overflow-hidden shadow-xl border border-black/5 group">
            {slideshowImages.map((img, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.title}
                  loading="eager"
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out hover:scale-105 ${
                    isActive ? "opacity-100 z-0" : "opacity-0 z-0"
                  }`}
                />
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-10"></div>

            {/* Top Location Tag Badge */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-md">
              <MapPin size={13} className="text-[#c6f022]" />
              <span>{slideshowImages[currentSlideIndex].location}</span>
            </div>

            {/* Bottom Title Caption */}
            <div className="absolute bottom-6 left-5 right-5 text-white z-10">
              <h4 className="text-lg font-bold text-white drop-shadow-md leading-snug">
                {slideshowImages[currentSlideIndex].title}
              </h4>
            </div>

            {/* Arrow Navigation */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center backdrop-blur-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Navigation Progress Bar */}
            <div className="absolute bottom-3 left-5 right-5 flex items-center gap-1.5 z-10">
              {slideshowImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    currentSlideIndex === idx
                      ? "flex-1 bg-[#c6f022] shadow-[0_0_8px_rgba(198,240,34,0.8)]"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
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
                Thousands of travelers have experienced raw nature in Meghalaya &amp; Assam with Borah Tours &amp; Travel. Drop your phone number below and our lead coordinator will call you in 15 minutes.
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
              alt="Shillong Scenery"
              className="w-full h-full object-cover scale-125 hover:scale-135 transition-transform duration-700"
              src={img2}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

