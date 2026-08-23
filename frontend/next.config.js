/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`
      }
    ];
  }
};

if (process.env.NODE_ENV === 'production') {
  const withPWA = require('@ducanh2912/next-pwa').default({
    dest: 'public',
    disable: false,
    register: true,
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    fallbacks: {
      document: '/offline.html'
    }
  });
  module.exports = withPWA(nextConfig);
} else {
  module.exports = nextConfig;
}
