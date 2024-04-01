// import "./src/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@libsql/client'],
  },
  i18n: {
    locales: ['fr'],
    defaultLocale: 'fr',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/concerts',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
