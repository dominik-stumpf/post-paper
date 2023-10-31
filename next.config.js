import pwa from '@ducanh2912/next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.dicebear.com'],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
}

const withPWA = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(
  nextConfig
);
