"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Header() {
  const [activeHash, setActiveHash] = useState("#home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const navLinks = [
    { name: "Car Rates", hash: "#car-rates" },
    { name: "Vehicles", hash: "#vehicles" },
    { name: "Destinations", hash: "#destinations" },
    { name: "Packages", hash: "#packages" },
    { name: "Gallery", hash: "#gallery" },
    { name: "Contact", hash: "#custom-trip" },
  ];

  // Sync Navbar search query with site-search events from page.tsx
  useEffect(() => {
    const handleSearchEvent = (e: CustomEvent<string>) => {
      setNavSearchQuery(e.detail || "");
    };

    window.addEventListener("site-search" as any, handleSearchEvent);
    return () => window.removeEventListener("site-search" as any, handleSearchEvent);
  }, []);

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

  const handleSearchChange = (value: string) => {
    setNavSearchQuery(value);
    // Broadcast query to page.tsx
    window.dispatchEvent(new CustomEvent("site-search", { detail: value }));

    // If typing query and not at packages section, scroll to packages
    if (value.trim()) {
      const targetElement = document.getElementById("packages");
      if (targetElement) {
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setActiveHash(hash);
    setMobileMenuOpen(false);
    setIsMobileSearchOpen(false);

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

        {/* Right Actions: Desktop Search Input + CTA + Mobile Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

          {/* Navbar Search Input (Desktop/Laptop) */}
          <div className="hidden md:flex items-center relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/60">
              <Search size={14} />
            </div>
            <input
              type="text"
              placeholder="Search tours..."
              value={navSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-8 pr-7 py-1.5 bg-white/10 hover:bg-white/15 focus:bg-white/20 text-white placeholder-white/60 text-xs rounded-full border border-white/15 focus:border-[#c6f022] outline-none transition-all w-32 xl:w-48 focus:w-56"
            />
            {navSearchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-white/60 hover:text-white cursor-pointer"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Book CTA Button */}
          <a
            href="#packages"
            onClick={(e) => handleLinkClick(e, "#packages")}
            className="btn-hover hidden sm:inline-flex items-center justify-center bg-[#c6f022] text-[#1e4630] font-bold text-xs sm:text-sm px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-md decoration-none cursor-pointer shrink-0 whitespace-nowrap"
          >
            Book Your Trip
          </a>

          {/* Mobile Search Toggle Icon */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-1.5 sm:p-2 text-white/90 hover:text-[#c6f022] transition-colors cursor-pointer shrink-0"
            aria-label="Toggle Search"
          >
            <Search size={18} className="sm:w-5 sm:h-5" />
          </button>

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

      {/* Expandable Mobile Search Bar Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-[#1e4630] text-white rounded-2xl p-2.5 shadow-2xl border border-white/10 mt-1 z-50 animate-in">
          <div className="relative flex items-center">
            <Search size={15} className="absolute left-3 text-white/60" />
            <input
              type="text"
              autoFocus
              placeholder="Search packages (e.g. Cherrapunji, Dawki, Tawang)..."
              value={navSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-8 pr-8 py-2 bg-white/15 text-white placeholder-white/60 text-xs rounded-xl border border-white/20 focus:border-[#c6f022] outline-none"
            />
            {navSearchQuery ? (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3 text-white/70 hover:text-white"
              >
                <X size={14} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-3 text-white/70 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-14 left-0 w-full bg-[#1e4630] text-white rounded-3xl p-5 shadow-2xl border border-white/10 mt-2 z-40">
          {/* Mobile Search Bar inside menu */}
          <div className="relative flex items-center mb-4">
            <Search size={15} className="absolute left-3 text-white/60" />
            <input
              type="text"
              placeholder="Search packages, places..."
              value={navSearchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-8 pr-8 py-2 bg-white/15 text-white placeholder-white/60 text-xs rounded-xl border border-white/20 focus:border-[#c6f022] outline-none"
            />
            {navSearchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3 text-white/70 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

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
