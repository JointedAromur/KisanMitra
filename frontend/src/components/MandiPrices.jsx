'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, MapPin, Search, Award, RefreshCw, AlertCircle, Check } from 'lucide-react';
import { getMandiPrices } from '../services/api';
import MandiIllustration from './illustrations/MandiIllustration';

const POPULAR_CROPS = [
  { id: 'Wheat', labelHi: 'गेहूं', labelEn: 'Wheat' },
  { id: 'Onion', labelHi: 'प्याज', labelEn: 'Onion' },
  { id: 'Tomato', labelHi: 'टमाटर', labelEn: 'Tomato' },
  { id: 'Soybean', labelHi: 'सोयाबीन', labelEn: 'Soybean' },
  { id: 'Potato', labelHi: 'आलू', labelEn: 'Potato' },
  { id: 'Rice', labelHi: 'धान/चावल', labelEn: 'Rice' },
  { id: 'Cotton', labelHi: 'कपास', labelEn: 'Cotton' },
  { id: 'Mustard', labelHi: 'सरसों', labelEn: 'Mustard' },
  { id: 'Garlic', labelHi: 'लहसुन', labelEn: 'Garlic' },
  { id: 'Chana', labelHi: 'चना', labelEn: 'Gram' },
];

export default function MandiPrices() {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [district, setDistrict] = useState('Lucknow');
  const [searchInput, setSearchInput] = useState('Lucknow');
  const [mandiData, setMandiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userCoords, setUserCoords] = useState(null);

  const fetchPrices = async (crop = selectedCrop, dist = searchInput) => {
    setIsLoading(true);
    setError('');

    try {
      const data = await getMandiPrices(crop, dist, userCoords?.lat || null, userCoords?.lon || null);
      setMandiData(data);
      setDistrict(dist);
    } catch (err) {
      setError(err.message || 'मंडी भाव लोड करने में समस्या आई / Failed to fetch Mandi prices');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices(selectedCrop, searchInput);
  }, [selectedCrop]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    fetchPrices(selectedCrop, searchInput.trim());
  };

  const handleCropSelect = (cropId) => {
    setSelectedCrop(cropId);
  };

  const topMandis = mandiData?.top3NearestMandis || [];

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-2 space-y-4 animate-in fade-in duration-300">
      {/* Top Visual Vector Header Card */}
      <div className="glass-panel rounded-3xl p-4 flex flex-col items-center justify-center">
        <MandiIllustration className="w-full h-28" />
        <div className="text-center mt-1">
          <h2 className="text-lg font-black text-slate-900 flex items-center justify-center gap-1.5">
            <TrendingUp className="w-5 h-5 text-[#15803D]" />
            मंडी भाव (Live APMC Mandi Rates)
          </h2>
          <p className="text-xs text-slate-600 font-semibold">
            निकटतम मंडियों के उच्चतम और वास्तविक दैनिक भाव
          </p>
        </div>
      </div>

      {/* Commodity Selector Pills */}
      <div className="glass-panel rounded-3xl p-4">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-black text-slate-900 uppercase tracking-wide">
            Select Commodity / फसल चुनें:
          </label>
          <span className="text-[11px] font-black text-emerald-900 bg-emerald-100/90 px-2.5 py-0.5 rounded-lg border border-emerald-300/80 shadow-2xs">
            {selectedCrop}
          </span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
          {POPULAR_CROPS.map((crop) => {
            const isSelected = selectedCrop === crop.id;
            return (
              <button
                key={crop.id}
                type="button"
                onClick={() => handleCropSelect(crop.id)}
                className={`tap-target px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-[#15803D] text-white shadow-md ring-2 ring-emerald-400/40'
                    : 'bg-white/80 hover:bg-white text-slate-800 border border-white/80 shadow-2xs'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                <span>{crop.labelHi}</span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                  ({crop.labelEn})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* District / City Search Input Box */}
      <div className="glass-panel rounded-3xl p-4 space-y-3">
        <form onSubmit={handleSearchSubmit} className="space-y-2">
          <label className="block text-xs font-black text-slate-800">
            Search Location / स्थान खोजें
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="उदा. Lucknow, Indore, Nashik, Karnal, Pune..."
                className="w-full pl-10 pr-3 py-2.5 bg-white/80 border border-white/80 rounded-xl text-sm font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#15803D] transition-all shadow-xs"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="tap-target bg-[#15803D] hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer border border-white/40"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Search className="w-4 h-4 stroke-[2.5]" />
              )}
              <span>खोजें (Search)</span>
            </button>
          </div>
        </form>

        {/* Quick Location Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar text-xs">
          <span className="text-[11px] text-slate-600 font-bold whitespace-nowrap">सुझाव:</span>
          {['Lucknow', 'Nashik', 'Indore', 'Ludhiana', 'Varanasi', 'Karnal', 'Jaipur', 'Pune'].map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setSearchInput(city);
                fetchPrices(selectedCrop, city);
              }}
              className="px-2.5 py-1 bg-white/70 hover:bg-white text-slate-800 font-bold rounded-lg border border-white/80 whitespace-nowrap text-[11px] shadow-2xs transition-colors cursor-pointer"
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass-panel border-2 border-red-300/80 bg-red-100/70 text-red-900 p-3.5 rounded-2xl text-xs flex items-start gap-2.5 shadow-sm">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      {/* Top Mandi Cards List */}
      <div className="space-y-3">
        {isLoading && (
          <div className="glass-panel rounded-3xl p-8 text-center shadow-sm">
            <RefreshCw className="w-6 h-6 animate-spin text-[#15803D] mx-auto mb-2" />
            <p className="text-xs font-black text-slate-900">
              {district} के लिए {selectedCrop} का ताजा भाव निकाला जा रहा है...
            </p>
            <p className="text-[11px] text-slate-600 font-semibold mt-0.5">Fetching latest real-time APMC Mandi rates</p>
          </div>
        )}

        {!isLoading && topMandis.length === 0 && !error && (
          <div className="glass-panel rounded-3xl p-6 text-center text-slate-700 text-xs font-bold shadow-sm">
            इस खोज के लिए कोई मंडी नहीं मिली। कृपया कोई अन्य जिला या फसल चुनें।
          </div>
        )}

        {!isLoading && topMandis.map((mandi, index) => {
          const isTop = index === 0;
          return (
            <div
              key={`${mandi.marketName}-${index}`}
              className={`glass-panel rounded-3xl flex flex-col gap-3 p-5 transition-all shadow-md ${
                isTop
                  ? 'border-2 border-emerald-400/90 ring-2 ring-emerald-400/30'
                  : ''
              }`}
            >
              {/* Card Top Row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {isTop && (
                      <span className="flex items-center gap-1 text-[10px] font-black bg-amber-100/90 text-amber-950 border border-amber-300 px-2 py-0.5 rounded-md uppercase shadow-2xs">
                        <Award className="w-3 h-3 text-amber-600 fill-amber-500" /> #1 Highest Rate
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-slate-600">
                      📍 {mandi.district}, {mandi.state}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mt-1 leading-snug">
                    {mandi.marketName}
                  </h3>
                </div>

                {/* Modal Price Highlight */}
                <div className="text-right flex-shrink-0">
                  <div className="text-xl font-black text-[#15803D]">
                    ₹{mandi.modalPrice}
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    per Quintal (₹/Q)
                  </div>
                </div>
              </div>

              {/* 3-Pill Minimal Grid (Min, Max, Distance) */}
              <div className="grid grid-cols-3 gap-2">
                <div className="glass-panel-subtle rounded-xl py-2 text-center text-xs font-bold text-slate-800 border border-white/80">
                  Min: ₹{mandi.minPrice}
                </div>
                <div className="glass-panel-subtle rounded-xl py-2 text-center text-xs font-bold text-slate-800 border border-white/80">
                  Max: ₹{mandi.maxPrice}
                </div>
                <div className="glass-panel-subtle rounded-xl py-2 text-center text-xs font-bold text-slate-800 border border-white/80">
                  📍 {mandi.distanceKm} km
                </div>
              </div>

              {/* Footer Alignment (Daily Arrivals & Updated Date) */}
              <div className="mt-1 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-600 font-bold px-1">
                <span>Daily Arrivals: {mandi.arrivalsTonnes || 600} Tonnes</span>
                <span>Updated: {mandi.lastUpdated || 'Today'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
