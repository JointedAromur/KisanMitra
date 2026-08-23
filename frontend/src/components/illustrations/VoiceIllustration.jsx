'use client';

export default function VoiceIllustration({ className = 'w-full h-32' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-32 drop-shadow-sm select-none"
      >
        <defs>
          <linearGradient id="viMicGrad" x1="160" y1="20" x2="160" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#16A34A" />
            <stop offset="1" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="viBubbleGrad" x1="40" y1="20" x2="100" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F0FDF4" />
            <stop offset="1" stopColor="#DCFCE7" />
          </linearGradient>
          <linearGradient id="viBubbleGrad2" x1="220" y1="20" x2="280" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
          <filter id="viShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#15803D" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ambient Ground Line */}
        <rect x="20" y="104" width="280" height="2" rx="1" fill="#E2E8F0" />

        {/* Left Speech Bubble: Regional Hindi Inquiry "यूरिया?" */}
        <g filter="url(#viShadow)">
          <path
            d="M 40 28 C 40 22, 45 18, 52 18 L 108 18 C 115 18, 120 22, 120 28 L 120 54 C 120 60, 115 64, 108 64 L 68 64 L 52 74 L 56 64 L 52 64 C 45 64, 40 60, 40 54 Z"
            fill="url(#viBubbleGrad)"
            stroke="#15803D"
            strokeWidth="1.5"
          />
          {/* Wave voice indicator inside speech bubble */}
          <line x1="56" y1="41" x2="56" y2="41" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <line x1="64" y1="36" x2="64" y2="46" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <line x1="72" y1="31" x2="72" y2="51" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <line x1="80" y1="34" x2="80" y2="48" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <line x1="88" y1="37" x2="88" y2="45" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <line x1="96" y1="40" x2="96" y2="42" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <text x="108" y="32" fill="#166534" fontSize="9" fontWeight="bold" fontFamily="sans-serif">HI</text>
        </g>

        {/* Right Speech Bubble: AI Expert Response */}
        <g filter="url(#viShadow)">
          <path
            d="M 200 24 C 200 18, 205 14, 212 14 L 272 14 C 279 14, 284 18, 284 24 L 284 50 C 284 56, 279 60, 272 60 L 268 60 L 272 70 L 256 60 L 212 60 C 205 60, 200 56, 200 50 Z"
            fill="url(#viBubbleGrad2)"
            stroke="#D97706"
            strokeWidth="1.5"
          />
          <text x="212" y="34" fill="#92400E" fontSize="9" fontWeight="bold" fontFamily="sans-serif">सलाह (AI Advice)</text>
          {/* Simulated Answer Line */}
          <line x1="212" y1="44" x2="270" y2="44" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
          <line x1="212" y1="51" x2="250" y2="51" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Central Acoustic Microphone & Sound Resonance Waves */}
        <g filter="url(#viShadow)">
          {/* Radiating Acoustic Ring 1 (Inner) */}
          <path
            d="M 136 34 A 32 32 0 0 0 136 66"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 184 34 A 32 32 0 0 1 184 66"
            stroke="#15803D"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Radiating Acoustic Ring 2 (Outer) */}
          <path
            d="M 124 24 A 48 48 0 0 0 124 76"
            stroke="#4ADE80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
            fill="none"
          />
          <path
            d="M 196 24 A 48 48 0 0 1 196 76"
            stroke="#4ADE80"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
            fill="none"
          />

          {/* Central Studio Mic Capsule */}
          <rect x="150" y="24" width="20" height="34" rx="10" fill="url(#viMicGrad)" stroke="#0F172A" strokeWidth="2" />
          {/* Mic Grille Lines */}
          <line x1="154" y1="32" x2="166" y2="32" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="154" y1="38" x2="166" y2="38" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="154" y1="44" x2="166" y2="44" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />

          {/* Mic Outer Cradle / U-Bar */}
          <path
            d="M 144 38 C 144 54, 176 54, 176 38"
            stroke="#0F172A"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Mic Vertical Stand Stem */}
          <line x1="160" y1="52" x2="160" y2="78" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          {/* Mic Heavy Weighted Base Plate */}
          <rect x="142" y="78" width="36" height="6" rx="3" fill="#0F172A" />
        </g>
      </svg>
    </div>
  );
}
