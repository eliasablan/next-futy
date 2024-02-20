/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sportmonks.com',
      },
      {
        protocol: 'https',
        hostname: 'crests.football-data.org',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        hostname: 'upload.wikimedia.org',
      },
      {
        hostname: 'googleusercontent.com',
      },
    ],
  },
}

export default nextConfig
