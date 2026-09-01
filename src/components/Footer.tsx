import React from "react";
import Link from "next/link";
import { Phone, MessageSquare, Mail, Globe, Video, Camera } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-high mt-stack-gap border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-margin-mobile lg:px-margin-desktop py-stack-gap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-gap">
          {/* Brand Col */}
          <div className="space-y-4">
            <h4 className="font-headline-md text-headline-md text-on-surface">
              Borah Tours
            </h4>
            <p className="font-body-md text-on-surface-variant">
              Discover the hidden gems of Meghalaya, Assam, and Arunachal Pradesh with locally curated experiences and authentic hospitality.
            </p>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h5 className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
              Contact Us
            </h5>
            <ul className="space-y-2 font-body-md text-on-surface-variant list-none pl-0">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors text-inherit decoration-none">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare size={16} className="text-primary shrink-0" />
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-inherit decoration-none">
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:hello@borahtours.com" className="hover:text-primary transition-colors text-inherit decoration-none">
                  hello@borahtours.com
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
                aria-label="Website"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:shadow-md transition-all decoration-none"
                href="#"
              >
                <Globe size={18} />
              </a>
              <a
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:shadow-md transition-all decoration-none"
                href="#"
              >
                <Video size={18} />
              </a>
              <a
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary hover:shadow-md transition-all decoration-none"
                href="#"
              >
                <Camera size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-outline-variant text-center font-label-sm text-label-sm text-on-surface-variant">
          © {currentYear} Borah Tours & Travels. Authentically North East.
        </div>
      </div>
    </footer>
  );
}
