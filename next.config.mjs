/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages deployment
  output: "export",
  // GitHub Pages serves from a subdirectory — uncomment and set basePath if needed:
  // basePath: "/sarcs-iiith.github.io",
  trailingSlash: true,
  images: {
    // Static export requires unoptimized images (no server-side processing)
    unoptimized: true,
  },
};

export default nextConfig;
