import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-high mt-stack-gap border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop py-stack-gap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-gap">
          {/* Brand Col */}
          <div className="space-y-4">
            <h4 className="font-headline-md text-headline-md text-on-surface">
              Borah Tour &amp; Travels
            </h4>
            <p className="font-body-md text-on-surface-variant">
              Discover the hidden gems of Meghalaya, Assam, and Arunachal Pradesh with locally curated experiences, vehicle rentals, and authentic hospitality.
            </p>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h5 className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Contact Us
            </h5>
            <ul className="space-y-2.5 font-body-md text-on-surface-variant list-none pl-0">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary shrink-0" />
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <a href="tel:+917002674473" className="hover:text-primary transition-colors text-inherit decoration-none">
                    +91 70026 74473
                  </a>
                  <span className="hidden sm:inline opacity-40">|</span>
                  <a href="tel:+919706765703" className="hover:text-primary transition-colors text-inherit decoration-none">
                    +91 97067 65703
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare size={16} className="text-primary shrink-0" />
                <a href="https://wa.me/917002674473?text=Hi%20Borah%20Tour%20and%20Travels%2C%20I%20want%20to%20enquire%20about%20a%20tour%20package." target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-inherit decoration-none">
                  WhatsApp: +91 70026 74473
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:Sintuborah81@gmail.com" className="hover:text-primary transition-colors text-inherit decoration-none">
                  Sintuborah81@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Socials Col */}
          <div className="space-y-4">
            <h5 className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Follow the Journey
            </h5>
            <div className="flex gap-4">
              <a
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:shadow-md transition-all decoration-none"
                href="https://www.facebook.com/share/1b5RprKUhw/"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:shadow-md transition-all decoration-none"
                href="https://www.instagram.com/borahtourandtravels_?utm_source=qr&igsi=ZHZ0cGMyMzd3Yjls"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:shadow-md transition-all decoration-none"
                href="https://youtube.com/@borahtourandtravels?si=zG1DNnTrLxpjNL00"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-outline-variant text-center font-label-sm text-label-sm text-on-surface-variant">
          © {currentYear} Borah Tour &amp; Travels. Authentically North East.
        </div>
      </div>
    </footer>
  );
}
