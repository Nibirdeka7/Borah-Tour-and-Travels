"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <main className="w-full min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="w-full pt-20 flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
