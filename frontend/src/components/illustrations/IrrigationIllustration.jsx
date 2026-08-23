'use client';

export default function IrrigationIllustration({ className = 'w-full h-32' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-32 drop-shadow-sm select-none"
      >
        <defs>
          {/* Drop Gradient */}
          <linearGradient id="irDropGrad" x1="160" y1="18" x2="160" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="0.5" stopColor="#0284C7" />
            <stop offset="1" stopColor="#0369A1" />
          </linearGradient>

          {/* Field Gradients */}
          <linearGradient id="irFieldGrad1" x1="40" y1="70" x2="280" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22C55E" />
            <stop offset="1" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="irFieldGrad2" x1="40" y1="85" x2="280" y2="115" gradientUnits="userSpaceOnUse">
            <stop stopColor="#16A34A" />
            <stop offset="1" stopColor="#14532D" />
          </linearGradient>

          {/* Cloud Gradient */}
          <linearGradient id="irCloudGrad" x1="60" y1="15" x2="120" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F1F5F9" />
            <stop offset="1" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>

        {/* Golden Agricultural Sun */}
        <circle cx="245" cy="34" r="18" fill="#FACC15" opacity="0.9" />
        <circle cx="245" cy="34" r="24" stroke="#FDE047" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

        {/* Rain Cloud on the Left */}
        <g opacity="0.95">
          <path
            d="M 68 44 C 64 44 60 41 60 36 C 60 32 63 28 67 28 C 68 23 73 19 79 19 C 85 19 90 22 92 27 C 94 26 97 26 99 28 C 103 30 105 34 104 38 C 107 39 109 42 108 45 C 107 48 104 50 100 50 L 68 50 C 64 50 60 47 60 44 Z"
            fill="url(#irCloudGrad)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          {/* Gentle Falling Rain Specks */}
          <line x1="68" y1="56" x2="64" y2="66" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
          <line x1="82" y1="56" x2="78" y2="68" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
          <line x1="96" y1="56" x2="92" y2="66" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
        </g>

        {/* Furrowed Agricultural Green Fields */}
        {/* Layer 1 - Furrow Horizon */}
        <path
          d="M 20 100 Q 110 68 160 70 Q 210 72 300 95 L 300 115 L 20 115 Z"
          fill="#BBF7D0"
          opacity="0.5"
        />

        {/* Layer 2 - Middle Terraced Furrows */}
        <path
          d="M 20 104 Q 90 78 160 80 Q 230 82 300 105 L 300 118 L 20 118 Z"
          fill="url(#irFieldGrad1)"
        />

        {/* Layer 3 - Foreground Precision Crop Beds */}
        <path
          d="M 20 110 Q 100 90 160 92 Q 220 94 300 112 L 300 120 L 20 120 Z"
          fill="url(#irFieldGrad2)"
        />

        {/* Furrow Irrigation Lines / Channels */}
        <path d="M 60 118 Q 110 92 160 93" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <path d="M 260 118 Q 210 94 160 93" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <path d="M 160 93 L 160 120" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

        {/* Small Sprout Plant Accents on Rows */}
        <g stroke="#14532D" strokeWidth="1.5" strokeLinecap="round">
          <path d="M 85 86 C 85 82 82 80 80 80 C 80 83 83 85 85 86 Z" fill="#4ADE80" />
          <path d="M 85 86 C 85 82 88 80 90 80 C 90 83 87 85 85 86 Z" fill="#4ADE80" />
          <path d="M 235 88 C 235 84 232 82 230 82 C 230 85 233 87 235 88 Z" fill="#4ADE80" />
          <path d="M 235 88 C 235 84 238 82 240 82 C 240 85 237 87 235 88 Z" fill="#4ADE80" />
        </g>

        {/* Central Pure Smart Water Droplet */}
        <g>
          {/* Water Ripple Ground Rings */}
          <ellipse cx="160" cy="94" rx="28" ry="6" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />
          <ellipse cx="160" cy="94" rx="42" ry="9" fill="none" stroke="#7DD3FC" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

          {/* Droplet Body */}
          <path
            d="M 160 22 C 160 22 138 52 138 66 C 138 78 148 88 160 88 C 172 88 182 78 182 66 C 182 52 160 22 160 22 Z"
            fill="url(#irDropGrad)"
            stroke="#0284C7"
            strokeWidth="1.5"
          />

          {/* Internal Droplet Gleam */}
          <path
            d="M 148 62 C 146 54 153 40 156 34"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="151" cy="68" r="2" fill="#FFFFFF" opacity="0.9" />

          {/* Inner Plant Sprout Inside Droplet */}
          <path
            d="M 160 76 Q 160 62 163 56"
            stroke="#BBF7D0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 162 64 C 166 62 170 63 170 66 C 168 68 164 67 162 64 Z"
            fill="#86EFAC"
          />
          <path
            d="M 161 68 C 157 66 153 67 153 70 C 155 72 159 71 161 68 Z"
            fill="#86EFAC"
          />
        </g>
      </svg>
    </div>
  );
}
