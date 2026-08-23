'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, CloudRain, TrendingUp, Mic } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home', labelHi: 'होम', icon: Home },
  { href: '/crop-doctor', label: 'Crop Doctor', labelHi: 'फसल डॉक्टर', icon: Camera },
  { href: '/irrigation', label: 'Irrigation', labelHi: 'स्मार्ट सिंचाई', icon: CloudRain },
  { href: '/mandi', label: 'Mandi', labelHi: 'मंडी भाव', icon: TrendingUp },
  { href: '/voice', label: 'Voice Help', labelHi: 'बोलकर पूछें', icon: Mic },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-nav pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === '/crop-doctor' && pathname === '/vision') ||
            (item.href === '/irrigation' && pathname === '/weather');

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#15803D] font-bold'
                  : 'text-slate-600 hover:text-[#15803D]'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-emerald-100/90 text-[#15803D] shadow-xs ring-1 ring-emerald-400/40'
                    : 'bg-transparent text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-[11px] font-bold mt-1 leading-none text-center">
                {item.labelHi}
              </span>
              <span className="text-[9px] text-slate-500 font-medium leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
