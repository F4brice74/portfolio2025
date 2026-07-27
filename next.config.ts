import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  outputFileTracingRoot: __dirname,
  
  // Performance optimizations
  reactStrictMode: true,
  
  // Optimize builds
  swcMinify: true,
  
  // Optimize production
  poweredByHeader: false,
  
  // Experimental features for better performance
  experimental: {
    // Use optimized package imports
    optimizePackageImports: ['@mantine/core', '@mantine/hooks', '@tabler/icons-react'],
  },
  
  // Reduce memory usage in dev
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
