/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/hw',
        destination: '/hw/1',
        permanent: false,
      },
      {
        source: '/res',
        destination: '/hw/1',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
