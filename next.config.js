/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['images.unsplash.com'],
        remotePatterns: [
            {
              hostname: 'images.unsplash.com',
              protocol: 'https',
            },
            {
                hostname: 'randomuser.me',
                protocol: 'https',
            },
        ],
    },
}

module.exports = nextConfig
