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
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

module.exports = nextConfig
