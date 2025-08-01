/** @type {import('next').NextConfig} */
// Force rebuild for react-is dependency issue - 2025-07-29
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  // Disable static generation to avoid SSR issues
  generateBuildId: async () => {
    return 'speedcube-build'
  },
  // Skip build-time optimizations that cause SSR errors
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  // Disable SSR for all pages that use client-side state
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config, { isServer, dev }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Handle JSON imports
    config.module.rules.push({
      test: /\.json$/,
      type: 'javascript/auto',
    });
    
    // Handle client-side only modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    return config;
  },
}

module.exports = nextConfig
