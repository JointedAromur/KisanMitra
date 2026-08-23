'use client';

import { useState, useEffect, useCallback } from 'react';
import { CloudRain, Droplets, Sun, AlertTriangle, CheckCircle2, Clock, MapPin, RefreshCw, Compass, ShieldCheck, Plus, Minus } from 'lucide-react';
import { getWeatherAndIrrigation } from '../services/api';
import IrrigationIllustration from './illustrations/IrrigationIllustration';

export default function IrrigationDashboard() {
  const [lat, setLat] = useState(26.8467); // Lucknow / Northern Agricultural Plain default
  const [lon, setLon] = useState(80.9462);
  const [locationName, setLocationName] = useState('Lucknow Farm Region');
  const [daysSinceWatered, setDaysSinceWatered] = useState(2);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState('');

  // Fetch weather and recalculate irrigation advisory dynamically
  const fetchWeather = useCallback(async (targetLat = lat, targetLon = lon, targetDays = daysSinceWatered) => {
    setIsLoading(true);
    setError('');

    try {
      const data = await getWeatherAndIrrigation(targetLat, targetLon, targetDays);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'सिंचाई परामर्श लोड करने में समस्या आई / Failed to retrieve irrigation advisory');
    } finally {
      setIsLoading(false);
    }
  }, [lat, lon, daysSinceWatered]);

  // Request browser geolocation
  const handleAutoLocate = () => {
    if (!navigator.geolocation) {
      setError('आपके ब्राउज़र में GPS लोकेशन समर्थित नहीं है।');
      return;
    }

    setIsLocating(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = Math.round(position.coords.latitude * 10000) / 10000;
        const userLon = Math.round(position.coords.longitude * 10000) / 10000;
        setLat(userLat);
        setLon(userLon);
        setLocationName(`खेत का स्थान (${userLat}, ${userLon})`);
        setIsLocating(false);
        fetchWeather(userLat, userLon, daysSinceWatered);
      },
      (err) => {
        console.warn('Geolocation failed:', err);
        setIsLocating(false);
        fetchWeather(lat, lon, daysSinceWatered);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    fetchWeather(lat, lon, daysSinceWatered);
  }, []);

  // Update days stepper and immediately re-evaluate
  const handleDaysChange = (newDays) => {
    const clampedVal = Math.max(0, Math.min(14, newDays));
    setDaysSinceWatered(clampedVal);
    fetchWeather(lat, lon, clampedVal);
  };

  const rec = weatherData?.recommendation;
  const isDoNotIrrigate = rec?.action === 'DO_NOT_IRRIGATE';
  const isDelay = rec?.action === 'DELAY_IRRIGATION';

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-2 space-y-4 animate-in fade-in duration-300">
      {/* Top Visual Vector Illustration */}
      <div className="glass-panel rounded-3xl p-4 flex flex-col items-center justify-center">
        <IrrigationIllustration className="w-full h-28" />
        <div className="text-center mt-1">
          <h2 className="text-lg font-black text-slate-900 flex items-center justify-center gap-1.5">
            <Droplets className="w-5 h-5 text-[#15803D]" />
            स्मार्ट सिंचाई (Smart Irrigation Plan)
          </h2>
          <p className="text-xs text-slate-600 font-semibold">
            48 घंटे का मौसम विश्लेषण और फसल जल प्रबंधन
          </p>
        </div>
      </div>

      {/* Location & Interactive Days Since Watered Card */}
      <div className="glass-panel rounded-3xl p-4 space-y-3.5">
        {/* GPS Location Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-900 font-bold min-w-0">
            <MapPin className="w-4 h-4 text-[#15803D] flex-shrink-0" />
            <span className="truncate">{locationName}</span>
          </div>

          <button
            type="button"
            onClick={handleAutoLocate}
            disabled={isLocating}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-white/80 text-[#15803D] border border-white/80 rounded-xl hover:bg-white active:scale-95 shadow-xs transition-all flex-shrink-0 cursor-pointer"
          >
            <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'खोज रहे हैं...' : 'GPS लोकेशन'}</span>
          </button>
        </div>

        {/* Dynamic Days Since Watered Stepper */}
        <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
          <div>
            <label className="text-xs font-black text-slate-900 block">
              पिछली सिंचाई के दिन (Days Since Watered):
            </label>
            <span className="text-[11px] text-slate-500 font-semibold">
              बटन दबाते ही नई मात्रा की गणना होगी
            </span>
          </div>

          <div className="flex items-center gap-2 glass-panel-subtle p-1.5 rounded-2xl border border-white/80">
            <button
              type="button"
              onClick={() => handleDaysChange(daysSinceWatered - 1)}
              disabled={daysSinceWatered <= 0 || isLoading}
              className="w-9 h-9 rounded-xl bg-white text-slate-900 font-black flex items-center justify-center hover:bg-emerald-50 active:scale-90 disabled:opacity-40 transition-all shadow-xs cursor-pointer border border-white/80"
              title="Decrease Days"
            >
              <Minus className="w-4 h-4 stroke-[3]" />
            </button>

            <div className="w-10 text-center">
              <span className="text-base font-black text-slate-900 block leading-tight">
                {daysSinceWatered}
              </span>
              <span className="text-[9px] text-slate-600 font-bold block uppercase">
                दिन (Days)
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleDaysChange(daysSinceWatered + 1)}
              disabled={daysSinceWatered >= 14 || isLoading}
              className="w-9 h-9 rounded-xl bg-white text-slate-900 font-black flex items-center justify-center hover:bg-emerald-50 active:scale-90 disabled:opacity-40 transition-all shadow-xs cursor-pointer border border-white/80"
              title="Increase Days"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass-panel border-2 border-red-300/80 bg-red-100/70 text-red-900 p-3.5 rounded-2xl text-xs flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      {/* 48-Hour Recommendation & Advisory View */}
      {weatherData && rec && (
        <div className="space-y-3.5">
          {/* Main Decision Banner */}
          <div
            className={`rounded-3xl p-5 border-2 shadow-lg transition-all ${
              isDoNotIrrigate
                ? 'glass-panel border-red-400 bg-red-50/80 text-slate-900'
                : isDelay
                ? 'glass-panel border-amber-400 bg-amber-50/80 text-slate-900'
                : 'glass-panel border-[#15803D] bg-emerald-50/80 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                  isDoNotIrrigate
                    ? 'bg-red-200/80 text-red-950 border-red-300'
                    : isDelay
                    ? 'bg-amber-200/80 text-amber-950 border-amber-300'
                    : 'bg-emerald-200/80 text-emerald-950 border-emerald-300'
                }`}
              >
                प्राथमिकता: {rec.urgency || 'सामान्य'} Urgency
              </span>

              <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                <CloudRain className="w-4 h-4 text-blue-600" />
                <span>48h वर्षा: {weatherData.currentSummary?.totalPrecipitation48h || '0.0 mm'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 my-2">
              {isDoNotIrrigate ? (
                <AlertTriangle className="w-9 h-9 text-red-600 flex-shrink-0" />
              ) : isDelay ? (
                <Clock className="w-9 h-9 text-amber-600 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-9 h-9 text-[#15803D] flex-shrink-0" />
              )}
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {rec.decision}
                </h3>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  {rec.action}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-800 mt-2.5 leading-relaxed glass-panel-subtle p-3 rounded-2xl font-bold border border-white/80">
              {rec.reason}
            </p>
          </div>

          {/* Calculated Water Schedule (Liters/m², Liters/Acre, Drip Duration) */}
          {rec.calculatedSchedule && (
            <div className="glass-panel rounded-3xl p-5 space-y-3.5">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-600" />
                जल गणना व समय सारणी (Water Requirement & Schedule):
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-cyan-100/70 border-2 border-cyan-300/80 p-3.5 rounded-2xl shadow-2xs">
                  <span className="text-[11px] text-cyan-950 font-black uppercase tracking-wide block">
                    आवश्यक पानी (Water Req):
                  </span>
                  <span className="text-sm font-black text-cyan-950 mt-0.5 block leading-tight">
                    {rec.calculatedSchedule.waterRequirement}
                  </span>
                </div>

                <div className="bg-blue-100/70 border-2 border-blue-300/80 p-3.5 rounded-2xl shadow-2xs">
                  <span className="text-[11px] text-blue-950 font-black uppercase tracking-wide block">
                    ड्रिप समय (Drip Duration):
                  </span>
                  <span className="text-sm font-black text-blue-950 mt-0.5 block leading-tight">
                    {rec.calculatedSchedule.estimatedDripDuration}
                  </span>
                </div>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-2xl text-xs space-y-1 font-bold text-slate-800 border border-white/80">
                <div>
                  <strong>सिंचाई का सही समय (Timing):</strong> {rec.calculatedSchedule.recommendedWindow}
                </div>
                <div>
                  <strong>मृदा नमी स्थिति (Soil Status):</strong> {rec.calculatedSchedule.soilMoistureDeficit}
                </div>
              </div>
            </div>
          )}

          {/* 48-Hour Microclimate Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel p-3.5 rounded-2xl text-center shadow-xs">
              <Sun className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-600 block uppercase font-bold">औसत तापमान (Avg Temp)</span>
              <span className="text-sm font-black text-slate-900">
                {weatherData.currentSummary?.avgTemp48h}
              </span>
            </div>

            <div className="glass-panel p-3.5 rounded-2xl text-center shadow-xs">
              <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <span className="text-[10px] text-slate-600 block uppercase font-bold">औसत आर्द्रता (Humidity)</span>
              <span className="text-sm font-black text-slate-900">
                {weatherData.currentSummary?.avgHumidity48h}
              </span>
            </div>
          </div>

          {/* Field Protection Tip */}
          {rec.fieldAdvice && (
            <div className="glass-panel border-2 border-emerald-300 bg-emerald-100/70 p-3.5 rounded-2xl text-xs text-emerald-950 font-bold space-y-0.5">
              <span className="text-[#15803D] uppercase font-black flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> खेत सुरक्षा सलाह (Field Advice):
              </span>
              <p className="font-bold text-slate-900">{rec.fieldAdvice}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
