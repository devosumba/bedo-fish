import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // quality 90 is used throughout the project (ServicesSection, ImpactSection, QuickViewModal)
    // Next.js 16 defaults to [75] only — unlisted qualities return HTTP 400 in production
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
