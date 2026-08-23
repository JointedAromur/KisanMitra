'use client';

import { useState, useRef } from 'react';
import { Mic, Square, Volume2, Globe, Sparkles, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { sendVoiceQuery } from '../services/api';
import VoiceIllustration from './illustrations/VoiceIllustration';

const SUPPORTED_LANGUAGES = [
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'en', name: 'English' }
];

export default function VoiceInput() {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLang, setSelectedLang] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [voiceResult, setVoiceResult] = useState(null);
  const [error, setError] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioElementRef = useRef(null);

  // Start recording audio via MediaRecorder API
  const startRecording = async () => {
    setError('');
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await handleAudioSubmission(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Microphone access failed:', err);
      setError('माइक्रोफ़ोन अनुमति नहीं मिली। कृपया ब्राउज़र सेटिंग्स में माइक्रोफ़ोन की अनुमति दें।');
      setIsRecording(false);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Submit audio Blob to /api/voice
  const handleAudioSubmission = async (audioBlob) => {
    setIsLoading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Data = reader.result;
        try {
          const result = await sendVoiceQuery(base64Data, selectedLang);
          setVoiceResult(result);

          if (result.response?.audioBlob) {
            playAudioResponse(result.response.audioBlob);
          }
        } catch (apiErr) {
          setError(apiErr.message || 'आवाज़ की पहचान करने में समस्या आई।');
        } finally {
          setIsLoading(false);
        }
      };
    } catch (err) {
      setError('ऑडियो तैयार करने में समस्या आई।');
      setIsLoading(false);
    }
  };

  // Play audio response
  const playAudioResponse = (audioSrc) => {
    try {
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }

      const audio = new Audio(audioSrc);
      audioElementRef.current = audio;
      setIsPlayingAudio(true);

      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => setIsPlayingAudio(false);
      audio.play();
    } catch (e) {
      console.warn('Playback error:', e);
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-2 space-y-4 animate-in fade-in duration-300">
      {/* Top Visual Vector Illustration */}
      <div className="glass-panel rounded-3xl p-4 flex flex-col items-center justify-center">
        <VoiceIllustration className="w-full h-28" />
        <div className="text-center mt-1">
          <h2 className="text-lg font-black text-slate-900 flex items-center justify-center gap-1.5">
            <Mic className="w-5 h-5 text-[#15803D]" />
            बोलकर पूछें (Voice Farm Assistant)
          </h2>
          <p className="text-xs text-slate-600 font-semibold">
            अपनी मातृभाषा में कृषि व मंडी से संबंधित कोई भी सवाल पूछें
          </p>
        </div>
      </div>

      {/* Language Selector Card */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
        <label className="text-xs font-black text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
          <Globe className="w-4 h-4 text-[#15803D]" />
          भाषा चुनें (Language):
        </label>
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="tap-target bg-white/80 text-slate-900 text-xs font-bold px-3 py-2 rounded-xl border border-white/80 focus:border-[#15803D] focus:outline-none cursor-pointer shadow-xs"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Push-To-Talk Tap Interface */}
      <div className="glass-panel rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-5">
        {/* Animated Microphone Tap Button */}
        <div className="relative">
          {isRecording && (
            <div className="absolute -inset-4 rounded-full bg-red-500/25 animate-ping pointer-events-none" />
          )}
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            className={`w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-200 shadow-xl select-none cursor-pointer active:scale-95 border-2 border-white/80 ${
              isRecording
                ? 'bg-red-600 text-white scale-105 shadow-red-600/40 ring-4 ring-red-300'
                : 'bg-[#15803D] hover:bg-emerald-800 text-white shadow-emerald-700/30 ring-4 ring-emerald-100'
            }`}
          >
            {isRecording ? (
              <>
                <Square className="w-10 h-10 fill-current" />
                <span className="text-[11px] font-black mt-1 uppercase tracking-wider">
                  सुन रहे हैं...
                </span>
                <span className="text-[9px] font-bold text-red-100">
                  (Listening)
                </span>
              </>
            ) : (
              <>
                <Mic className="w-11 h-11 stroke-[2.5]" />
                <span className="text-xs font-black mt-1">
                  दबाकर बोलें
                </span>
                <span className="text-[10px] font-bold text-emerald-100">
                  (Hold to Speak)
                </span>
              </>
            )}
          </button>
        </div>

        <div className="text-center max-w-xs">
          <p className="text-xs font-black text-slate-900">
            {isRecording
              ? 'बोलने के बाद बटन छोड़ें (Release button to get answer)'
              : 'बटन को दबाकर रखें और अपनी समस्या या प्रश्न पूछें'}
          </p>
          <p className="text-[11px] text-slate-600 font-semibold mt-1">
            उदा: &quot;यूरिया कब डालना चाहिए?&quot;, &quot;आलू का भाव क्या है?&quot;
          </p>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-black text-[#15803D] animate-pulse bg-emerald-100/80 px-4 py-2 rounded-xl border border-emerald-300">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>उत्तर तैयार किया जा रहा है... (Synthesizing answer)</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass-panel border-2 border-red-300/80 bg-red-100/70 text-red-900 p-3.5 rounded-2xl text-xs flex items-start gap-2.5 shadow-sm">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span className="font-bold">{error}</span>
        </div>
      )}

      {/* Voice Result & Response Card */}
      {voiceResult && (
        <div className="glass-panel rounded-3xl p-5 border-2 border-emerald-400 shadow-lg space-y-3.5 animate-in fade-in duration-200">
          {/* Question / Transcription */}
          <div className="glass-panel-subtle p-3.5 rounded-2xl border border-white/80">
            <div className="text-[10px] font-black text-slate-600 uppercase tracking-wider mb-1">
              आपका प्रश्न (Your Question):
            </div>
            <p className="text-sm font-black text-slate-900">
              &ldquo;{voiceResult.transcribedText}&rdquo;
            </p>
          </div>

          {/* Regional Advisory Answer */}
          <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#15803D] flex items-center gap-1.5 uppercase tracking-wide">
                <HelpCircle className="w-4 h-4" />
                विशेषज्ञ कृषि सलाह (Expert Farm Advisory)
              </span>

              {voiceResult.response?.audioBlob && (
                <button
                  type="button"
                  onClick={() => playAudioResponse(voiceResult.response.audioBlob)}
                  className={`tap-target flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    isPlayingAudio
                      ? 'bg-[#15803D] text-white animate-pulse shadow-sm'
                      : 'bg-emerald-200 text-emerald-900 hover:bg-emerald-300 border border-emerald-300'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingAudio ? 'बोल रहा है...' : 'सुनें (Play)'}</span>
                </button>
              )}
            </div>

            <p className="text-sm text-slate-900 leading-relaxed font-bold">
              {voiceResult.response?.answerRegional || voiceResult.response?.answerEnglish}
            </p>

            {voiceResult.response?.answerRegional && voiceResult.response?.answerEnglish && (
              <p className="text-xs text-slate-600 pt-2 border-t border-emerald-200/80 font-medium">
                <strong>English translation:</strong> {voiceResult.response.answerEnglish}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
