/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '', // Keep empty if no port is specified
            },
            {
                protocol: 'https',
                hostname: 'backend-4c5c.onrender.com', // Allow images from backend URL if needed
                port: '', // Keep empty if no port is specified
            },
        ],
        domains: [
            'localhost',
            '127.0.0.1',
        ],
    },
};

export default nextConfig;

