'use client';

import React from 'react';
import Image from 'next/image';

interface FarmerScanAnimationProps {
  className?: string;
  imageSrc?: string;
}

export default function FarmerScanAnimation({
  className = 'w-full h-full min-h-[300px]',
  imageSrc = '/farmer-phone.png'
}: FarmerScanAnimationProps) {
  return (
    <div className={`relative flex items-center justify-center select-none overflow-hidden ${className}`}>
      {/* Ambient Glow Backdrop */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl" />
      </div>

      {/* 1. Base Static Farmer Illustration Image */}
      <div className="relative w-full h-full max-w-sm aspect-square flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="Farmer scanning crop leaf with smartphone"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-contain drop-shadow-md"
        />

        {/* 2. The Scanning Beam (The Hack: Absolute Screen Overlay Area) */}
        <div className="absolute top-[48%] left-[66%] w-14 h-24 sm:w-16 sm:h-28 -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden border border-emerald-400/50 bg-emerald-950/15 backdrop-blur-[1px] shadow-inner pointer-events-none">
          {/* Target Corner Reticles */}
          <div className="absolute inset-1 pointer-events-none flex flex-col justify-between p-0.5 opacity-80">
            <div className="flex justify-between">
              <span className="w-2 h-2 border-t-2 border-l-2 border-emerald-400" />
              <span className="w-2 h-2 border-t-2 border-r-2 border-emerald-400" />
            </div>
            <div className="flex justify-between">
              <span className="w-2 h-2 border-b-2 border-l-2 border-emerald-400" />
              <span className="w-2 h-2 border-b-2 border-r-2 border-emerald-400" />
            </div>
          </div>

          {/* 3. Continuously Oscillating Scanning Laser Beam */}
          <div className="w-full h-full relative">
            <div className="w-full animate-laser-sweep flex flex-col">
              {/* Trailing Scan Fan Light */}
              <div className="w-full h-10 bg-gradient-to-b from-transparent to-emerald-400/25 pointer-events-none" />
              {/* Glowing High-Intensity Laser Beam Line */}
              <div className="w-full h-1 bg-emerald-400 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
