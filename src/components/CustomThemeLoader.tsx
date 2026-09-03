"use client";

import React from "react";

interface CustomThemeLoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  light?: boolean;
  className?: string;
}

export default function CustomThemeLoader({
  size = "md",
  text,
  light = false,
  className = ""
}: CustomThemeLoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-7 h-7 border-2",
    lg: "w-10 h-10 border-3"
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className={`rounded-full animate-spin border-t-transparent ease-in-out shrink-0 ${sizeClasses[size]} ${
          light
            ? "border-[#c6f022] border-r-white/30 border-b-white/10 border-l-white/30"
            : "border-[#1e4630] border-r-[#1e4630]/30 border-b-transparent border-l-[#1e4630]/30"
        }`}
      ></div>

      {text && (
        <span
          className={`font-medium text-xs tracking-wide ${
            light ? "text-white/90" : "text-[#1c1716]"
          }`}
        >
          {text}
        </span>
      )}
    </div>
  );
}
