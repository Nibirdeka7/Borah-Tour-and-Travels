import type { Metadata, Viewport } from "next";
import { Inter, Sora, Manrope } from "next/font/google";
import "./globals.css";
import AppLayoutWrapper from "@/components/AppLayoutWrapper";
import PagePreloader from "@/components/PagePreloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.borahtourandtravels.in"),
  alternates: {
    canonical: "/",
  },
  title: "Borah Tour & Travels | Customized Meghalaya, Assam & Arunachal Tours",
  description: "Plan your dream trip to Northeast India with Borah Tour & Travels. We specialize in customized Meghalaya tour packages, Assam sightseeing, and Arunachal Pradesh itineraries with Guwahati airport pickups.",
  keywords: [
    "northeast beautiful places",
    "top places to visit in northeast",
    "top places to visit in meghalay",
    "top places to visit in arunachal",
    "top places to visit in assam",
    "car booking",
    "guwahati airport taxi",
    "best car book for travel",
    "northeast tour packages",
    "northeast travel",
    "northeast tourism",
    "northeast trip",
    "northeast tour",
    "northeast destination",
    "northeast travel guide",
    "northeast travel agency",
    "northeast travel company",
    "northeast travel company",
    "Meghalaya tour from Guwahati",
    "Cherrapunji taxi tour",
    "Meghalaya 5 day tour",
    "Borah Tour and Travels",
    "borahtoursandtravel",
    "Assam tour package",
    "travel",
    "tour",
    "destination",
    "northeast destination",
    "Arunachal Pradesh Tawang tour"
  ],
  authors: [{ name: "Borah Tours & Travel" }],
  openGraph: {
    title: "Borah Tours & Travel - Authentically North East",
    description: "Handcrafted Meghalaya, Assam & Arunachal private tours with local drivers, homestays, and airport transfers.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Borah Tours & Travel | Northeast India Customized Tours",
    description: "Handcrafted Meghalaya & Assam trips with Guwahati airport pickup.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${manrope.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-background text-on-surface antialiased">
        <PagePreloader />
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
