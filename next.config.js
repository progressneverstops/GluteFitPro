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
  // Set base path if deploying to a subdirectory (e.g., /GluteFitPro/)
  // basePath: '/GluteFitPro',
  // Set trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  // Disable image optimization (not available in static export)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

