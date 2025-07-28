/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  // Disable all static optimizations to prevent SSR issues
  experimental: {
    runtime: 'nodejs',
    serverComponentsExternalPackages: [],
  },
  // Skip build-time optimizations that cause SSR errors
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
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
