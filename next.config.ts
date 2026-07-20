import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Deployed on Vercel with the Next.js server runtime (not `output: 'export'`)
  // so the /api/contact route handler can call Resend server-side.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
