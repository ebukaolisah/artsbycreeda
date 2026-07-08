/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Force ONE canonical host: www.artsbycreeda.com -> apex artsbycreeda.com (301)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.artsbycreeda.com' }],
        destination: 'https://artsbycreeda.com/:path*',
        permanent: true,
      },
      // Old /commission URL -> new /order, permanent (301)
      { source: '/commission', destination: '/order', permanent: true },
      // Old API path -> new (any client still posting to the old URL)
      { source: '/api/commission/:path*', destination: '/api/order/:path*', permanent: true },
    ];
  },
};

export default nextConfig;
