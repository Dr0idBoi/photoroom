/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Оптимизация изображений
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.getmodels.ru',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // Отключаем оптимизацию для Docker
    unoptimized: true,
  },
  
  // Настройки для production
  poweredByHeader: false,
  
  // Настройки серверных действий
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
      allowedOrigins: ['localhost:3000', '0.0.0.0:3000'],
    },
  },
  
  // Логирование
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
