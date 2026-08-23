'use client';

export default function CropDoctorIllustration({ className = 'w-full h-32' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-32 drop-shadow-sm select-none"
      >
        <defs>
          <linearGradient id="cdLeafGrad" x1="60" y1="20" x2="160" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22C55E" />
            <stop offset="0.5" stopColor="#16A34A" />
            <stop offset="1" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="cdStemGrad" x1="100" y1="40" x2="160" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#86EFAC" />
            <stop offset="1" stopColor="#166534" />
          </linearGradient>
          <linearGradient id="cdLensGrad" x1="140" y1="30" x2="220" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ECFDF5" stopOpacity="0.8" />
            <stop offset="1" stopColor="#A7F3D0" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="cdSunGlow" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FEF08A" stopOpacity="0.5" />
            <stop offset="1" stopColor="#FDE047" stopOpacity="0" />
          </linearGradient>
          <filter id="cdGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#15803D" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Ambient Sunlight & Field Backdrop */}
        <circle cx="160" cy="60" r="54" fill="url(#cdSunGlow)" />
        <rect x="20" y="102" width="280" height="2.5" rx="1.25" fill="#E2E8F0" />
        <circle cx="50" cy="103" r="3" fill="#15803D" opacity="0.3" />
        <circle cx="270" cy="103" r="3" fill="#15803D" opacity="0.3" />

        {/* Left Sprout Background Accent */}
        <path
          d="M 50 102 C 50 80, 70 70, 85 75 C 80 90, 65 102, 50 102 Z"
          fill="#BBF7D0"
          opacity="0.7"
        />
        <path
          d="M 50 102 Q 65 85 85 75"
          stroke="#16A34A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Central Vibrant Crop Leaf */}
        <g filter="url(#cdGlow)">
          {/* Main Leaf Body */}
          <path
            d="M 75 100 C 65 55, 115 22, 175 25 C 195 55, 160 98, 75 100 Z"
            fill="url(#cdLeafGrad)"
          />
          {/* Leaf Secondary Shading */}
          <path
            d="M 75 100 C 105 75, 145 60, 175 25 C 150 65, 120 95, 75 100 Z"
            fill="#14532D"
            opacity="0.2"
          />
          {/* Main Central Leaf Vein */}
          <path
            d="M 75 100 Q 125 65 175 25"
            stroke="url(#cdStemGrad)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Side Veins */}
          <path d="M 105 84 Q 115 72 132 75" stroke="#BBF7D0" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
          <path d="M 125 69 Q 138 58 152 60" stroke="#BBF7D0" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
          <path d="M 92 90 Q 96 82 108 85" stroke="#BBF7D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
          <path d="M 145 52 Q 155 42 165 44" stroke="#BBF7D0" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
        </g>

        {/* Diagnostic Optical Magnifier / Scanner Tool */}
        <g filter="url(#cdGlow)">
          {/* Magnifier Glass Outer Frame */}
          <circle cx="178" cy="58" r="32" stroke="#15803D" strokeWidth="4" fill="#FFFFFF" fillOpacity="0.4" />
          {/* Lens Tint & Refraction */}
          <circle cx="178" cy="58" r="28" fill="url(#cdLensGrad)" stroke="#10B981" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* AI Inspection Target Crosshairs */}
          <circle cx="178" cy="58" r="14" stroke="#15803D" strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="178" y1="36" x2="178" y2="44" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
          <line x1="178" y1="72" x2="178" y2="80" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
          <line x1="156" y1="58" x2="164" y2="58" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
          <line x1="192" y1="58" x2="200" y2="58" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />

          {/* Precision Diagnostic Point */}
          <circle cx="178" cy="58" r="3.5" fill="#15803D" />
          <circle cx="178" cy="58" r="6" stroke="#22C55E" strokeWidth="1" opacity="0.8" />

          {/* Lens Reflection Highlight */}
          <path d="M 160 46 A 22 22 0 0 1 196 46" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />

          {/* Magnifier Ergonomic Handle */}
          <path
            d="M 201 80 L 232 106 C 235 109, 240 109, 243 106 C 246 103, 246 98, 243 95 L 212 69"
            fill="#0F172A"
          />
          <path
            d="M 204 77 L 230 99"
            stroke="#15803D"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* AI Health Sparks / Status Indicators */}
        <g>
          {/* Healthy Star 1 */}
          <path d="M 235 32 L 237 38 L 243 40 L 237 42 L 235 48 L 233 42 L 227 40 L 233 38 Z" fill="#EAB308" />
          {/* Healthy Star 2 */}
          <path d="M 105 24 L 106.5 28 L 111 29.5 L 106.5 31 L 105 35.5 L 103.5 31 L 99 29.5 L 103.5 28 Z" fill="#22C55E" />
          {/* Small Pulsing Node */}
          <circle cx="255" cy="48" r="2.5" fill="#15803D" />
        </g>
      </svg>
    </div>
  );
}
