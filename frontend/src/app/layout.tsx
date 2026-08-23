import React from 'react';
import './globals.css';
import Navigation from '../components/Navigation';
import OfflineBanner from '../components/OfflineBanner';
import DynamicBackground from '../components/DynamicBackground';

export const viewport = {
  themeColor: '#15803d',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
};

export const metadata = {
  title: 'KisanMitra - Farmer Companion & PWA (किसान मित्र)',
  description: 'AI Crop Disease Detection, Smart Irrigation Scheduler, Live Mandi Market Prices & Regional Voice Advisory for Indian Farmers',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'KisanMitra'
  },
  icons: {
    icon: '/icons/icon-192x192.png',
    apple: '/icons/icon-192x192.png'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#15803d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for (var i = 0; i < regs.length; i++) {
                    regs[i].unregister();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased bg-[#F8FAFC] text-slate-900 min-h-screen relative selection:bg-emerald-100 selection:text-emerald-900">
        {/* Dynamic Background Image System with Route Mapping */}
        <DynamicBackground />

        {/* Top Rural Connectivity Banner */}
        <OfflineBanner />

        {/* Foreground Content Shell */}
        <main className="relative z-10 pb-24 pt-3 min-h-screen">
          {children}
        </main>

        {/* Frosted Glass Bottom Navigation */}
        <Navigation />
      </body>
    </html>
  );
}
