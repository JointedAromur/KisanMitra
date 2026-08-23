'use client';

export default function MandiIllustration({ className = 'w-full h-32' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-32 drop-shadow-sm select-none"
      >
        <defs>
          {/* Canopy Striped Gradient */}
          <linearGradient id="miStripeGreen" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#16A34A" />
            <stop offset="1" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="miStripeWhite" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F1F5F9" />
          </linearGradient>

          {/* Sacks & Produce Gradients */}
          <linearGradient id="miSackGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#D97706" />
            <stop offset="1" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="miWheatGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FDE047" />
            <stop offset="1" stopColor="#CA8A04" />
          </linearGradient>

          {/* Graph Upward Trend Gradient */}
          <linearGradient id="miGraphGrad" x1="180" y1="30" x2="280" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#10B981" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Base Ground Line */}
        <rect x="20" y="104" width="280" height="2" rx="1" fill="#E2E8F0" />

        {/* Upward Trading Growth Trend / Market Chart in Background */}
        <g opacity="0.85">
          {/* Grid lines */}
          <line x1="200" y1="35" x2="295" y2="35" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="65" x2="295" y2="65" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="200" y1="95" x2="295" y2="95" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

          {/* Growth Area Fill */}
          <path
            d="M 205 95 L 230 75 L 255 82 L 285 40 L 285 95 Z"
            fill="#DCFCE7"
            opacity="0.6"
          />
          {/* Trend Line */}
          <path
            d="M 205 95 L 230 75 L 255 82 L 285 40"
            stroke="url(#miGraphGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Trend Data Nodes */}
          <circle cx="205" cy="95" r="3" fill="#15803D" />
          <circle cx="230" cy="75" r="3" fill="#15803D" />
          <circle cx="255" cy="82" r="3" fill="#15803D" />
          <circle cx="285" cy="40" r="4.5" fill="#15803D" stroke="#FFFFFF" strokeWidth="2" />

          {/* ₹ Symbol Green Coin Badge */}
          <circle cx="285" cy="22" r="11" fill="#15803D" />
          <text x="285" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold" fontFamily="sans-serif">₹</text>
        </g>

        {/* APMC Mandi Market Canopy Stall */}
        <g>
          {/* Wooden Stall Posts */}
          <rect x="42" y="44" width="4" height="60" rx="2" fill="#78350F" />
          <rect x="154" y="44" width="4" height="60" rx="2" fill="#78350F" />
          {/* Stall Counter Table */}
          <rect x="36" y="78" width="128" height="26" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="36" y="78" width="128" height="5" rx="1" fill="#94A3B8" />

          {/* Traditional Scalloped Market Canopy Roof */}
          {/* Canopy Base Frame */}
          <path d="M 32 44 L 168 44 L 160 22 L 40 22 Z" fill="#15803D" />

          {/* Colored Scallop Stripes */}
          {/* Stripe 1 */}
          <path d="M 32 44 L 54 44 L 52 22 L 40 22 Z" fill="url(#miStripeGreen)" />
          {/* Stripe 2 */}
          <path d="M 54 44 L 76 44 L 74 22 L 52 22 Z" fill="url(#miStripeWhite)" />
          {/* Stripe 3 */}
          <path d="M 76 44 L 98 44 L 96 22 L 74 22 Z" fill="url(#miStripeGreen)" />
          {/* Stripe 4 */}
          <path d="M 98 44 L 120 44 L 118 22 L 96 22 Z" fill="url(#miStripeWhite)" />
          {/* Stripe 5 */}
          <path d="M 120 44 L 142 44 L 140 22 L 118 22 Z" fill="url(#miStripeGreen)" />
          {/* Stripe 6 */}
          <path d="M 142 44 L 168 44 L 160 22 L 140 22 Z" fill="url(#miStripeWhite)" />

          {/* Scalloped Valance Edge */}
          <path
            d="M 32 44 Q 43 51 54 44 Q 65 51 76 44 Q 87 51 98 44 Q 109 51 120 44 Q 131 51 142 44 Q 155 51 168 44"
            fill="none"
            stroke="#15803D"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Harvest Burlap Sacks & Fresh Produce Crates */}
        <g>
          {/* Jute Grain Sack 1 (Left) */}
          <path
            d="M 45 104 C 42 92, 45 82, 56 82 C 67 82, 70 92, 67 104 Z"
            fill="url(#miSackGrad)"
            stroke="#78350F"
            strokeWidth="1"
          />
          {/* Tied Neck */}
          <ellipse cx="56" cy="82" rx="6" ry="2" fill="#B45309" stroke="#78350F" strokeWidth="1" />
          {/* Sack Texture Lines */}
          <path d="M 50 88 Q 56 94 62 88" stroke="#78350F" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 49 96 Q 56 101 63 96" stroke="#78350F" strokeWidth="1" fill="none" opacity="0.6" />

          {/* Jute Grain Sack 2 (Stacked behind) */}
          <path
            d="M 64 104 C 62 88, 65 80, 77 80 C 89 80, 92 88, 89 104 Z"
            fill="url(#miSackGrad)"
            stroke="#78350F"
            strokeWidth="1"
          />
          <ellipse cx="77" cy="80" rx="6" ry="2" fill="#B45309" stroke="#78350F" strokeWidth="1" />

          {/* Fresh Tomato Produce Crate */}
          <rect x="94" y="86" width="30" height="18" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1" />
          <circle cx="101" cy="85" r="4.5" fill="#EF4444" />
          <circle cx="109" cy="84" r="5" fill="#DC2626" />
          <circle cx="117" cy="85" r="4.5" fill="#EF4444" />
          <circle cx="105" cy="89" r="4" fill="#B91C1C" />
          <circle cx="113" cy="89" r="4" fill="#DC2626" />

          {/* Golden Wheat Sheaf Bouquet (Right) */}
          <g transform="translate(132, 68)">
            <path d="M 12 36 Q 10 18 2 4" stroke="url(#miWheatGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 12 36 Q 12 16 12 0" stroke="url(#miWheatGrad)" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 12 36 Q 14 18 22 4" stroke="url(#miWheatGrad)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Wheat Grains */}
            <ellipse cx="2" cy="5" rx="2.5" ry="4" transform="rotate(-20 2 5)" fill="#FACC15" />
            <ellipse cx="12" cy="2" rx="2.5" ry="4" fill="#FACC15" />
            <ellipse cx="22" cy="5" rx="2.5" ry="4" transform="rotate(20 22 5)" fill="#FACC15" />
            {/* Ribbon Tie */}
            <rect x="9" y="24" width="6" height="3" rx="1" fill="#15803D" />
          </g>
        </g>
      </svg>
    </div>
  );
}
