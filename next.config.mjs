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
      type: 'asset/source',
    });

    return config;
  },
};

export default nextConfig;
