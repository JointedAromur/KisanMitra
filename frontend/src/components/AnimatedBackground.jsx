'use client';

import { usePathname } from 'next/navigation';
import CropDoctorIllustration from './illustrations/CropDoctorIllustration';
import IrrigationIllustration from './illustrations/IrrigationIllustration';
import MandiIllustration from './illustrations/MandiIllustration';
import VoiceIllustration from './illustrations/VoiceIllustration';

export default function AnimatedBackground() {
  const pathname = usePathname();

  // Determine active route
  const getIllustration = () => {
    switch (pathname) {
      case '/crop-doctor':
      case '/vision':
        return (
          <div className="w-full max-w-sm opacity-20 transform scale-110 transition-all duration-700 ease-out">
            <CropDoctorIllustration className="w-full h-48" />
          </div>
        );
      case '/irrigation':
      case '/weather':
        return (
          <div className="w-full max-w-sm opacity-20 transform scale-110 transition-all duration-700 ease-out">
            <IrrigationIllustration className="w-full h-48" />
          </div>
        );
      case '/mandi':
        return (
          <div className="w-full max-w-sm opacity-20 transform scale-110 transition-all duration-700 ease-out">
            <MandiIllustration className="w-full h-48" />
          </div>
        );
      case '/voice':
        return (
          <div className="w-full max-w-sm opacity-20 transform scale-110 transition-all duration-700 ease-out">
            <VoiceIllustration className="w-full h-48" />
          </div>
        );
      case '/':
      default:
        return (
          <div className="w-full max-w-md opacity-20 flex justify-center items-end transition-all duration-700 ease-out">
            {/* Subtle Horizon Landscape Vector */}
            <svg
              viewBox="0 0 400 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-36 drop-shadow-sm select-none"
            >
              <path
                d="M0 120 C100 85, 200 110, 400 80 L400 120 L0 120 Z"
                fill="#22C55E"
                fillOpacity="0.18"
              />
              <path
                d="M0 120 C120 100, 240 70, 400 95 L400 120 L0 120 Z"
                fill="#15803D"
                fillOpacity="0.12"
              />
              {/* Distant Sprout Accents */}
              <circle cx="80" cy="98" r="4" fill="#15803D" fillOpacity="0.3" />
              <circle cx="210" cy="88" r="5" fill="#15803D" fillOpacity="0.3" />
              <circle cx="340" cy="92" r="4" fill="#15803D" fillOpacity="0.3" />
            </svg>
          </div>
        );
    }
  };

  return (
    <>
      {/* Dynamic Ambient Fluid Blur Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Emerald Ambient Glow (Top Right) */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl" />
        {/* Sky/Cyan Glow (Mid Left) */}
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan-200/25 rounded-full blur-3xl" />
        {/* Amber Glow (Bottom Center) */}
        <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      {/* Fixed Background Vector Illustration Container */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-end justify-center pb-20">
        {getIllustration()}
      </div>
    </>
  );
}
