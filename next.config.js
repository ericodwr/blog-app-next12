/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      env: {
        mongodb_username: 'ecosapi22',
        mongodb_password: 'y7W3T7iZAPP9HADr',
        mongodb_cluster: 'blog-app-next12',
        mongodb_database: 'my-site-dev',
      },
    };
  }

  return {
    ...nextConfig,
    env: {
      mongodb_username: 'ecosapi22',
      mongodb_password: 'y7W3T7iZAPP9HADr',
      mongodb_cluster: 'blog-app-next12',
      mongodb_database: 'my-site',
    },
  };
};
