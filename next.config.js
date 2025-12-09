/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.getmodels.ru',
      },
    ],
    unoptimized: true,
  },
}

module.exports = nextConfig



