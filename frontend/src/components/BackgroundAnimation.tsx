'use client';

import React from 'react';

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Ambient Soft Radial Fluid Gradient Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl" />
    </div>
  );
}
