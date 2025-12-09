/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable static export for GitHub Pages
  output: 'export',
  // Set base path for GitHub Pages subdirectory deployment
  basePath: '/GluteFitPro',
  // Set trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  // Disable image optimization (not available in static export)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

