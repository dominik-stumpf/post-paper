/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push('sharp');
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

// const withPWA = require("@ducanh2912/next-pwa").default({
//   dest: "public",
//   disable: process.env.NODE_ENV === 'development',
// });

module.exports = nextConfig;
