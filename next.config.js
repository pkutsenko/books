/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  swcMinify: true,
  rewrites: async () => [
    {
      source: '/api/:path*',
      destination: `${process.env.API_HOST}/api/:path*`,
    },
  ],
}

module.exports = nextConfig
