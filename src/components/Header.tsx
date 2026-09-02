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
    { name: "Contact", hash: "#custom-trip" },
  ];

  // Intersection Observer to highlight active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Triggers when section is around the center-top of viewport
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
      // Calculate header offset
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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-6xl z-50 font-manrope">
      <div className="bg-[#1e4630] text-white rounded-full px-6 py-3 shadow-2xl flex items-center justify-between border border-white/10 backdrop-blur-md">
        
        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-2.5 cursor-pointer decoration-none group"
        >
          <img
            src="/img/logoHero.png"
            alt="Borah Tour & Travels Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform"
          />
          <span className="font-headline-md text-lg sm:text-xl tracking-tight text-white font-semibold">
            Borah<span className="text-[#c6f022] font-normal"> Tour &amp; Travels</span>
          </span>
        </a>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.hash}
              onClick={(e) => handleLinkClick(e, link.hash)}
              className={`text-sm font-medium transition-colors decoration-none cursor-pointer ${
                activeHash === link.hash
                  ? "text-[#c6f022] font-semibold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="#packages"
            onClick={(e) => handleLinkClick(e, "#packages")}
            className="btn-hover hidden sm:inline-flex items-center justify-center bg-[#c6f022] text-[#1e4630] font-bold text-sm px-6 py-2.5 rounded-full shadow-md decoration-none cursor-pointer"
          >
            Book Your Trip
          </a>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-[#c6f022] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#1e4630] text-white rounded-3xl p-6 shadow-2xl border border-white/10 mt-2 z-40">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.hash}
                onClick={(e) => handleLinkClick(e, link.hash)}
                className={`text-base py-2 decoration-none transition-colors cursor-pointer ${
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
              className="mt-2 text-center bg-[#c6f022] text-[#1e4630] font-semibold text-sm py-3 rounded-full decoration-none"
            >
              Book Your Trip
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
