'use client';

import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    // Unregister stale service workers in local development to prevent cached CSS blockage
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.location.hostname === 'localhost') {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    // Initial check
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
    }

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReconnected) return null;

  return (
    <aside
      aria-label="Network connectivity status"
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-2 text-center text-xs font-bold shadow-md transition-all duration-300 border-b ${
        isOnline
          ? 'bg-emerald-700 text-white border-emerald-800'
          : 'bg-amber-600 text-white border-amber-700'
      }`}
    >
      <div className="max-w-md mx-auto flex items-center justify-center space-x-2">
        {isOnline ? (
          <>
            <Wifi className="w-4 h-4 animate-bounce" />
            <span>ऑनलाइन वापस आ गए / Back Online — Data Synced</span>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4" />
            <span>ऑफ़लाइन मोड / Offline Mode — Showing Cached Farm Advisory Data</span>
          </>
        )}
      </div>
    </aside>
  );
}
