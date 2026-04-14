import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // quality 90 is used throughout the project (ServicesSection, ImpactSection, QuickViewModal)
    // Next.js 16 defaults to [75] only — unlisted qualities return HTTP 400 in production
    qualities: [75, 90],
  },
};

export default nextConfig;
