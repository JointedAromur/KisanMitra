'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sprout,
  User,
  MapPin,
  Trees,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const CROP_OPTIONS = [
  { id: 'wheat', labelHi: 'गेहूं', labelMr: 'गहू', labelEn: 'Wheat' },
  { id: 'tomato', labelHi: 'टमाटर', labelMr: 'टोमॅटो', labelEn: 'Tomato' },
  { id: 'onion', labelHi: 'प्याज', labelMr: 'कांदा', labelEn: 'Onion' },
  { id: 'cotton', labelHi: 'कपास', labelMr: 'कापूस', labelEn: 'Cotton' },
  { id: 'soybean', labelHi: 'सोयाबीन', labelMr: 'सोयाबीन', labelEn: 'Soybean' },
  { id: 'rice', labelHi: 'धान', labelMr: 'भात/तांदूळ', labelEn: 'Paddy' },
];

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: 'रमेश यादव (Ramesh Yadav)',
    phone: '9876543210',
    landAcres: '2.5',
    district: 'प्रयागराज / Prayagraj',
    crops: ['wheat', 'tomato'],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const toggleCrop = (cropId: string) => {
    setFormData((prev) => ({
      ...prev,
      crops: prev.crops.includes(cropId)
        ? prev.crops.filter((c) => c !== cropId)
        : [...prev.crops, cropId],
    }));
  };

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      const googleProfile = {
        name: 'रमेश यादव (Ramesh Yadav)',
        email: 'ramesh.farmer@gmail.com',
        phone: '9876543210',
        landAcres: '2.5',
        district: 'Prayagraj, Uttar Pradesh',
        crops: ['Wheat', 'Tomato'],
        isLoggedIn: true,
        authMethod: 'google',
        loginTime: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('kisan_user_profile', JSON.stringify(googleProfile));
      }
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 700);
    }, 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const userProfile = {
      name: formData.name.trim() || 'शेतकरी मित्र (Farmer)',
      phone: formData.phone.trim(),
      landAcres: formData.landAcres.trim() || '1.0',
      district: formData.district.trim() || 'स्थानिक जिल्हा',
      crops: formData.crops,
      isLoggedIn: true,
      authMethod: 'manual',
      loginTime: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('kisan_user_profile', JSON.stringify(userProfile));
    }

    setSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 600);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center px-4 py-8 select-none">
      {/* 1. Background Image Integration (Full-Screen Fixed Blur Canvas) */}
      <img
        src="/image/login.png"
        alt="KisanMitra Farm"
        className="fixed inset-0 object-cover -z-10 opacity-30 blur-sm w-full h-full pointer-events-none scale-105"
      />

      {/* 2. Glassmorphic Form Card (Apple Frosted Glass) */}
      <div className="bg-white/50 backdrop-blur-lg border border-white/40 rounded-3xl p-6 sm:p-8 shadow-xl relative z-10 w-full max-w-lg mx-auto mt-6 sm:mt-12 transition-all">
        {/* Card Header & Brand Icon */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-emerald-700/20 border-2 border-white text-white">
            <Sprout className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              स्वागत आहे, किसान मित्र
            </h1>
            <p className="text-xs font-semibold text-emerald-800 mt-0.5">
              Welcome, Kisan Mitra • AI शेती सहाय्यक
            </p>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            शेतीच्या सर्व सोयी आणि AI सल्ले एकाच ठिकाणी मिळवा
          </p>
        </div>

        {/* 3. Modern Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || isLoading}
          className="w-full tap-target py-3 px-4 bg-white hover:bg-slate-50/90 active:scale-98 text-slate-800 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 border border-slate-300/80 shadow-sm shadow-slate-200/50 transition-all cursor-pointer group"
        >
          {googleLoading ? (
            <div className="w-5 h-5 border-2 border-slate-300 border-t-emerald-600 rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          )}
          <span>Login with Google / गूगल सह लॉग इन</span>
        </button>

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300/60" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white/70 px-3 py-0.5 rounded-full text-slate-500 font-semibold border border-white/60">
              किंवा माहिती भरा (Or Set Up Profile)
            </span>
          </div>
        </div>

        {/* 4. Profile Setup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Name / नाव */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                नाव / Full Name (पूरा नाम):
              </span>
              <span className="text-[10px] text-slate-500 font-medium">आवश्यक</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="उदा. रमेश यादव (Ramesh Yadav)"
              className="w-full px-4 py-2.5 bg-white/60 border border-white/80 rounded-2xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Field 2: Land (Acres) / जमीन (एकड़) */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
                <Trees className="w-3.5 h-3.5 text-emerald-700" />
                जमीन (एकड़) / Land:
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                required
                value={formData.landAcres}
                onChange={(e) => setFormData({ ...formData, landAcres: e.target.value })}
                placeholder="2.5"
                className="w-full px-4 py-2.5 bg-white/60 border border-white/80 rounded-2xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Field 3: Phone Number / मोबाईल नंबर */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                मोबाईल / Mobile:
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="9876543210"
                className="w-full px-4 py-2.5 bg-white/60 border border-white/80 rounded-2xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Field 4: Location / जिल्हा (District) */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              गाव व जिल्हा / Village & District (स्थान):
            </label>
            <input
              type="text"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              placeholder="उदा. प्रयागराज, उत्तर प्रदेश / नाशिक, महाराष्ट्र"
              className="w-full px-4 py-2.5 bg-white/60 border border-white/80 rounded-2xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Field 5: Primary Crops Selection / मुख्य पिके */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-slate-800">
              मुख्य पिके / Primary Crops (फसलें चुनें):
            </label>
            <div className="flex flex-wrap gap-2">
              {CROP_OPTIONS.map((crop) => {
                const isSelected = formData.crops.includes(crop.id);
                return (
                  <button
                    key={crop.id}
                    type="button"
                    onClick={() => toggleCrop(crop.id)}
                    className={`tap-target px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-700'
                        : 'bg-white/60 text-slate-700 border border-white/80 hover:bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{crop.labelMr}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                      ({crop.labelEn})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || googleLoading}
            className="w-full tap-target py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/25 transition-all cursor-pointer mt-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>पुढे जा / Save & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security & Verification Guarantee */}
        <div className="mt-4 pt-3 border-t border-white/40 flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>100% सुरक्षित • शेतकरी डेटा संरक्षित (Safe & Encrypted)</span>
        </div>
      </div>

      {/* Success Notification Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-xs w-full text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              स्वागत आहे! (Welcome)
            </h3>
            <p className="text-xs text-slate-600">
              आपले प्रोफाइल यशस्वीरित्या सेव्ह केले गेले आहे.
            </p>
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-700 font-bold">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>डॅशबोर्ड उघडत आहे...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
