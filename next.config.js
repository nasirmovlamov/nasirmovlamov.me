/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
