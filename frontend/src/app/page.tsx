'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Camera,
  CloudRain,
  TrendingUp,
  Mic,
  CheckCircle2,
  Circle,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sun,
  ChevronRight,
  Layers,
  User,
  Sprout,
  Calendar,
  Sparkles,
  Edit3
} from 'lucide-react';

interface FarmerProfile {
  fullName: string;
  age: string;
  landSize: string;
  crops: string;
  location?: string;
}

const DEFAULT_PROFILE: FarmerProfile = {
  fullName: 'Mrityunjay Yadav',
  age: '42',
  landSize: '3.5',
  crops: 'Wheat, Tomato',
  location: 'Prayagraj, UP'
};

export default function Home() {
  // 1. State Management & Immediate Render
  const [isSetupComplete, setIsSetupComplete] = useState(true);

  // Form State
  const [formData, setFormData] = useState<FarmerProfile>({
    fullName: 'Mrityunjay Yadav',
    age: '42',
    landSize: '3.5',
    crops: 'Wheat, Tomato',
    location: 'Prayagraj, UP'
  });

  // Active Profile State
  const [profile, setProfile] = useState<FarmerProfile>(DEFAULT_PROFILE);

  // Interactive Daily Field Action Checklist State
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      titleHi: 'टमाटर के खेत में 45 मिनट ड्रिप सिंचाई',
      titleEn: '45 min drip irrigation for tomato field',
      tag: 'सिंचाई (Irrigation)',
      tagColor: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: CloudRain,
      route: '/irrigation',
      completed: true
    },
    {
      id: 'task-2',
      titleHi: 'निचली पत्तियों पर Early Blight की AI जांच',
      titleEn: 'AI leaf scan for blight spots on tomato',
      tag: 'फसल जांच (Crop Doctor)',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: Camera,
      route: '/crop-doctor',
      completed: false
    },
    {
      id: 'task-3',
      titleHi: 'प्रयागराज व लखनऊ मंडी में गेहूं के भाव चेक करें',
      titleEn: 'Check live wheat modal prices at APMC',
      tag: 'मंडी भाव (Mandi Rates)',
      tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: TrendingUp,
      route: '/mandi',
      completed: true
    },
    {
      id: 'task-4',
      titleHi: 'कृषि मित्र से यूरिया छिड़काव पर बोलकर सलाह लें',
      titleEn: 'Ask Voice Assistant about nitrogen timing',
      tag: 'कृषि सलाह (Voice Help)',
      tagColor: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: Mic,
      route: '/voice',
      completed: false
    }
  ]);

  // Load profile from localStorage on mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kisanMitraProfileData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.fullName) {
          setProfile(parsed);
          setFormData(parsed);
          setIsSetupComplete(true);
          return;
        }
      }
    } catch (err) {
      console.error('Error reading localStorage:', err);
    }
  }, []);

  // Form Submission Logic
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const newProfile: FarmerProfile = {
      fullName: formData.fullName.trim() || 'Mrityunjay Yadav',
      age: formData.age.trim() || '42',
      landSize: formData.landSize.trim() || '3.5',
      crops: formData.crops.trim() || 'Wheat, Tomato',
      location: formData.location?.trim() || 'Prayagraj, UP'
    };

    try {
      localStorage.setItem('kisanMitraProfileData', JSON.stringify(newProfile));
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }

    setProfile(newProfile);
    setIsSetupComplete(true);
  };

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  // Avatar Initials Helper
  const getAvatarInitials = (name: string) => {
    if (!name) return 'कि';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // ==========================================
  // VIEW A: SETUP FORM VIEW (if !isSetupComplete)
  // ==========================================
  if (!isSetupComplete) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-2 space-y-4 animate-in fade-in duration-300">
        {/* Setup Card Container */}
        <div className="glass-panel relative z-10 p-6 rounded-3xl mt-2 space-y-5">
          {/* Header Banner */}
          <div className="text-center space-y-1.5 border-b border-slate-200/80 pb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-600 flex items-center justify-center text-white text-2xl font-black shadow-md mx-auto ring-4 ring-emerald-100">
              <Sprout className="w-8 h-8 text-white stroke-[2.2]" />
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-2">
              किसान प्रोफाइल सेटअप
            </h1>
            <p className="text-xs text-slate-600 font-semibold">
              Farmer Profile Setup • Phase 1 Demonstration
            </p>
            <p className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 inline-block">
              कृषि मित्र में आपका स्वागत है! कृपया अपनी जानकारी दर्ज करें।
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Field 1: Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Full Name / नाम:</span>
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="उदा. Mrityunjay Yadav"
                className="w-full px-4 py-3 bg-white/90 border-2 border-slate-200 focus:border-[#15803D] rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-xs transition-all"
              />
            </div>

            {/* Field 2 & 3: Age and Land Size (2 Columns) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Age / उम्र:</span>
                </label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="उदा. 42"
                  className="w-full px-4 py-3 bg-white/90 border-2 border-slate-200 focus:border-[#15803D] rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-xs transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Land (Acres) / जमीन:</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.landSize}
                  onChange={(e) => setFormData({ ...formData, landSize: e.target.value })}
                  placeholder="उदा. 3.5"
                  className="w-full px-4 py-3 bg-white/90 border-2 border-slate-200 focus:border-[#15803D] rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-xs transition-all"
                />
              </div>
            </div>

            {/* Field 4: Current Crops */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <Sprout className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Current Crops / वर्तमान फसलें:</span>
              </label>
              <input
                type="text"
                required
                value={formData.crops}
                onChange={(e) => setFormData({ ...formData, crops: e.target.value })}
                placeholder="उदा. Wheat, Tomato (गेहूं, टमाटर)"
                className="w-full px-4 py-3 bg-white/90 border-2 border-slate-200 focus:border-[#15803D] rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-xs transition-all"
              />
            </div>

            {/* Field 5: Location */}
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Location / स्थान (जिला, राज्य):</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="उदा. Prayagraj, UP"
                className="w-full px-4 py-3 bg-white/90 border-2 border-slate-200 focus:border-[#15803D] rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-xs transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full tap-target mt-2 bg-[#15803D] hover:bg-emerald-800 active:scale-98 text-white font-black text-sm py-4 rounded-2xl shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 cursor-pointer transition-all border-2 border-white/50"
            >
              <span>Complete Profile / प्रोफाइल पूरा करें</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW B: FARMER PROFILE DASHBOARD (if isSetupComplete)
  // ==========================================
  return (
    <div className="w-full max-w-lg mx-auto px-4 py-2 space-y-4 animate-in fade-in duration-300">
      {/* 1. Dynamic Farmer Profile Identity Card */}
      <div className="glass-panel rounded-3xl p-5 relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3.5">
            {/* Farmer Avatar with Initials */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-700 to-green-600 flex items-center justify-center text-white text-lg font-black shadow-md border-2 border-white ring-2 ring-emerald-600/30">
                {getAvatarInitials(profile.fullName)}
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#15803D] text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  {profile.fullName}
                </h1>
              </div>
              <p className="text-xs text-slate-600 font-bold flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                {profile.location || 'Prayagraj, UP'} {profile.age ? `• ${profile.age} वर्ष (Age)` : ''}
              </p>
              <p className="text-[11px] text-slate-600 font-semibold mt-0.5">
                🌾 {profile.landSize} एकड़ • {profile.crops} ({profile.landSize} Acres • {profile.crops})
              </p>
            </div>
          </div>

          {/* Quick Edit Profile Button */}
          <button
            type="button"
            onClick={() => setIsSetupComplete(false)}
            className="tap-target text-[11px] font-bold text-slate-700 hover:text-[#15803D] bg-white/80 hover:bg-white px-3 py-1.5 rounded-xl border border-white/80 flex items-center gap-1 shadow-xs transition-all cursor-pointer active:scale-95 flex-shrink-0"
            title="Edit Profile"
          >
            <Edit3 className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">बदलें</span>
          </button>
        </div>

        {/* Verification & Weather Summary Badges */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-black bg-emerald-100/80 text-[#15803D] px-2.5 py-1 rounded-lg border border-emerald-300/80 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> KCC सत्यापित (Verified)
            </span>
            <span className="text-[10px] font-black bg-white/75 text-slate-800 px-2.5 py-1 rounded-lg border border-white/80 shadow-2xs">
              मृदा स्वास्थ्य: A+
            </span>
          </div>

          <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1 bg-white/75 px-2.5 py-1 rounded-lg border border-white/80 shadow-2xs">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>29°C धूप (Sunny)</span>
          </div>
        </div>
      </div>

      {/* 2. Krishi Score & Field Care Metrics (Clean Minimal 2-Column Grid) */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Card 1: Krishi Score */}
        <div className="glass-panel rounded-3xl p-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-baseline gap-1 h-8">
              <span className="text-3xl font-black text-slate-900 tracking-tight leading-none">88</span>
              <span className="text-xs font-bold text-[#15803D] leading-none">/ 100</span>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1.5 leading-tight">
              कृषि स्कोर • उत्कृष्ट
            </p>
          </div>

          {/* Clean thin progress bar vertically centered */}
          <div className="pt-3 flex items-center h-8">
            <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden border border-white/60">
              <div className="bg-[#15803D] h-full rounded-full w-[88%]" />
            </div>
          </div>
        </div>

        {/* Card 2: Care Streak */}
        <div className="glass-panel rounded-3xl p-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-baseline gap-1.5 h-8">
              <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">🔥 7 दिन</span>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1.5 leading-tight">
              दैनिक स्ट्रीक • सक्रिय
            </p>
          </div>

          {/* Subtle badge vertically centered */}
          <div className="pt-3 flex items-center h-8">
            <span className="text-[10px] font-bold text-emerald-900 bg-emerald-100/90 px-2.5 py-1 rounded-lg border border-emerald-300/80 leading-none shadow-2xs">
              आज अपडेट
            </span>
          </div>
        </div>
      </div>

      {/* 3. Today's Action Items (Interactive To-Do Checklist) */}
      <div className="glass-panel rounded-3xl p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
              आज के कार्य (Today&apos;s Action Items)
            </h2>
            <p className="text-xs text-slate-600 font-semibold">
              खेत की उत्पादकता बढ़ाने के लिए दैनिक चेकलिस्ट
            </p>
          </div>
          <span className="text-xs font-black bg-white/80 text-slate-900 px-3 py-1 rounded-xl border border-white/80 shadow-2xs">
            {completedCount}/{tasks.length} पूर्ण
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-200/70 h-2.5 rounded-full overflow-hidden border border-white/60">
          <div
            className="bg-[#15803D] h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Task Items List */}
        <div className="space-y-2.5 pt-1">
          {tasks.map((task) => {
            return (
              <div
                key={task.id}
                className={`p-3 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                  task.completed
                    ? 'glass-panel-subtle opacity-75'
                    : 'glass-panel hover:border-emerald-400 shadow-xs'
                }`}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  className="flex items-start gap-3 flex-1 cursor-pointer select-none"
                >
                  <button
                    type="button"
                    className="mt-0.5 flex-shrink-0 text-slate-400 hover:text-[#15803D] transition-colors"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#15803D] fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${task.tagColor}`}>
                        {task.tag}
                      </span>
                    </div>
                    <h4
                      className={`text-xs font-bold text-slate-900 mt-1 leading-snug ${
                        task.completed ? 'line-through text-slate-500' : ''
                      }`}
                    >
                      {task.titleHi}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {task.titleEn}
                    </p>
                  </div>
                </div>

                {/* Direct Jump to Tool Button */}
                <Link
                  href={task.route}
                  className="tap-target px-3 py-1.5 bg-white/80 hover:bg-emerald-100/90 hover:text-[#15803D] hover:border-emerald-300 text-slate-800 rounded-xl text-xs font-black border border-white/80 flex items-center gap-1 flex-shrink-0 shadow-2xs transition-all active:scale-95"
                >
                  <span>खोलें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Launch Grid */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
            <Layers className="w-5 h-5 text-[#15803D]" />
            कृषि उपकरण (Quick Launch Tools)
          </h2>
          <span className="text-[11px] text-slate-600 font-bold">4 प्रमुख सेवाएं</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* 1. Crop Doctor */}
          <Link
            href="/crop-doctor"
            className="tap-target glass-panel p-4 rounded-3xl hover:border-[#15803D] hover:shadow-lg active:scale-98 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-2 bg-emerald-100/90 text-[#15803D] rounded-2xl border border-emerald-300/80 shadow-2xs">
                  <Camera className="w-5 h-5 stroke-[2.5]" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#15803D] group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-sm font-black text-slate-900 group-hover:text-[#15803D] leading-snug">
                फसल डॉक्टर
              </h3>
              <p className="text-[10px] text-slate-500 font-bold">Crop Disease Doctor</p>
              <p className="text-[11px] text-slate-600 font-medium mt-1">
                पत्ती की फोटो खींचें और सटीक रोग निदान पाएं
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center text-[10px] font-black text-[#15803D]">
              <span>जांच शुरू करें →</span>
            </div>
          </Link>

          {/* 2. Smart Irrigation */}
          <Link
            href="/irrigation"
            className="tap-target glass-panel p-4 rounded-3xl hover:border-blue-500 hover:shadow-lg active:scale-98 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-2 bg-blue-100/90 text-blue-700 rounded-2xl border border-blue-300/80 shadow-2xs">
                  <CloudRain className="w-5 h-5 stroke-[2.5]" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-700 leading-snug">
                स्मार्ट सिंचाई
              </h3>
              <p className="text-[10px] text-slate-500 font-bold">Smart Irrigation</p>
              <p className="text-[11px] text-slate-600 font-medium mt-1">
                48 घंटे की बारिश का पूर्वानुमान व जल गणना
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center text-[10px] font-black text-blue-700">
              <span>योजना देखें →</span>
            </div>
          </Link>

          {/* 3. Mandi Rates */}
          <Link
            href="/mandi"
            className="tap-target glass-panel p-4 rounded-3xl hover:border-amber-500 hover:shadow-lg active:scale-98 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-2 bg-amber-100/90 text-amber-800 rounded-2xl border border-amber-300/80 shadow-2xs">
                  <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-sm font-black text-slate-900 group-hover:text-amber-800 leading-snug">
                मंडी भाव
              </h3>
              <p className="text-[10px] text-slate-500 font-bold">Live Mandi Rates</p>
              <p className="text-[11px] text-slate-600 font-medium mt-1">
                निकटतम APMC मंडियों के उच्चतम दैनिक भाव
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center text-[10px] font-black text-amber-800">
              <span>भाव चेक करें →</span>
            </div>
          </Link>

          {/* 4. Voice Assistant */}
          <Link
            href="/voice"
            className="tap-target glass-panel p-4 rounded-3xl hover:border-emerald-600 hover:shadow-lg active:scale-98 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-2 bg-emerald-100/90 text-[#15803D] rounded-2xl border border-emerald-300/80 shadow-2xs">
                  <Mic className="w-5 h-5 stroke-[2.5]" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#15803D] group-hover:translate-x-0.5 transition-all" />
              </div>
              <h3 className="text-sm font-black text-slate-900 group-hover:text-[#15803D] leading-snug">
                बोलकर पूछें
              </h3>
              <p className="text-[10px] text-slate-500 font-bold">Voice Assistant</p>
              <p className="text-[11px] text-slate-600 font-medium mt-1">
                अपनी क्षेत्रीय भाषा में कृषि सवाल पूछें व उत्तर सुनें
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center text-[10px] font-black text-[#15803D]">
              <span>सलाह लें →</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
