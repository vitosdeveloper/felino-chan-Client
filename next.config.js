/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        //cdn2.thecatapi.com
        //https://cdn2.thecatapi.com/images/ZVPEkT4Ix.jpg
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        port: '',
        pathname: '/images/**',
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
    ];
  },
};

module.exports = nextConfig;
