import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**'
      }
    ],
    // Disable the default image optimizer on Vercel
    unoptimized: process.env.NODE_ENV === 'production'
  }
  /* config options here */
}

export default nextConfig
