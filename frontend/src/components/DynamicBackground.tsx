'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const ROUTE_IMAGE_MAP: Record<string, string> = {
  '/': '/images/farmer-home.png',
  '/crop-doctor': '/images/farmer-crop.png',
  '/irrigation': '/images/farmer-irrigation.png',
  '/mandi': '/images/farmer-mandi.png',
  '/voice': '/images/farmer-voice.png',
};

export default function DynamicBackground() {
  const pathname = usePathname();

  // Match current route or fallback to home illustration
  const imageSrc = ROUTE_IMAGE_MAP[pathname] || '/images/farmer-home.png';

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none">
      {/* 1. Full-screen background image covering entire viewport without cutoffs */}
      <Image
        key={imageSrc}
        src={imageSrc}
        alt="KisanMitra Landscape Background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center transform scale-105 transition-all duration-1000 ease-out"
      />

      {/* 2. Soft atmospheric gradient scrim ensuring high contrast for text and cards */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/65 to-slate-50/85 backdrop-blur-[1.5px]" />

      {/* 3. Subtle ambient glow accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-teal-300/15 rounded-full blur-3xl" />
    </div>
  );
}
