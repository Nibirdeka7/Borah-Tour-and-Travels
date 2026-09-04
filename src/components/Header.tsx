"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [activeHash, setActiveHash] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Car Rates", hash: "#car-rates" },
    { name: "Vehicles", hash: "#vehicles" },
    { name: "Destinations", hash: "#destinations" },
    { name: "Packages", hash: "#packages" },
    { name: "Gallery", hash: "#gallery" },
    { name: "Contact", hash: "#custom-trip" },
  ];

  // Intersection Observer to highlight active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHash(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navLinks.forEach((link) => {
      const id = link.hash.substring(1);
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);



  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setActiveHash(hash);
    setMobileMenuOpen(false);

    const targetId = hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 90;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-50 font-manrope">
      <div className="bg-[#1e4630] text-white rounded-full px-3 sm:px-6 py-2 sm:py-3 shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-md relative gap-1.5 sm:gap-4">

        {/* Left: Logo + Full Brand Name for Mobile & Desktop */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-1 sm:gap-2.5 cursor-pointer decoration-none group shrink-0 min-w-0"
        >
          <img
            src="/img/branding/logoHero.png"
            alt="Borah Tour & Travels Logo"
            className="w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform shrink-0"
          />
          <span className="font-headline-md text-[11px] min-[360px]:text-xs sm:text-base md:text-lg lg:text-xl tracking-tight sm:tracking-normal text-white font-semibold whitespace-nowrap overflow-hidden text-ellipsis leading-none">
            Borah<span className="text-[#c6f022] font-normal"> Tour &amp; Travels</span>
          </span>
        </a>

        {/* Center: Desktop Navbar Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.hash}
              onClick={(e) => handleLinkClick(e, link.hash)}
              className={`text-xs xl:text-sm font-medium transition-colors decoration-none cursor-pointer whitespace-nowrap ${
                activeHash === link.hash
                  ? "text-[#c6f022] font-semibold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions: CTA + Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

          {/* Book CTA Button */}
          <a
            href="#packages"
            onClick={(e) => handleLinkClick(e, "#packages")}
            className="btn-hover hidden sm:inline-flex items-center justify-center bg-[#c6f022] text-[#1e4630] font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-md decoration-none cursor-pointer shrink-0 whitespace-nowrap"
          >
            Book Your Trip
          </a>

          {/* Mobile Drawer Menu Toggle Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-white/90 hover:text-[#c6f022] transition-colors cursor-pointer shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} className="sm:w-5 sm:h-5" /> : <Menu size={20} className="sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-14 left-0 w-full bg-[#1e4630] text-white rounded-3xl p-5 shadow-2xl border border-white/10 mt-2 z-40">

          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.hash}
                onClick={(e) => handleLinkClick(e, link.hash)}
                className={`text-sm py-2 decoration-none transition-colors cursor-pointer ${
                  activeHash === link.hash
                    ? "text-[#c6f022] font-semibold border-l-2 border-[#c6f022] pl-3"
                    : "text-white/80 hover:text-white pl-3"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#packages"
              onClick={(e) => handleLinkClick(e, "#packages")}
              className="mt-2 text-center bg-[#c6f022] text-[#1e4630] font-semibold text-xs py-2.5 rounded-full decoration-none"
            >
              Book Your Trip
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
