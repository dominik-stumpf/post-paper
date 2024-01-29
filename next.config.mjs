import './validate-env-vars.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.dicebear.com'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push('sharp');
    }
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
