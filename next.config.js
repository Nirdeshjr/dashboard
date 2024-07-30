/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MYSQL_HOST: '127.0.0.1',
        MYSQL_PORT: '3306',
        MYSQL_DATABASE: 'editBackend',
        MYSQL_USER: 'root',
        MYSQL_PASSWORD: '',
    },
    images: {
        domains: ['127.0.0.1'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.cache = {
                type: 'filesystem',
                cacheDirectory: '.next/cache',
                buildDependencies: {
                    config: [__filename]
                }
            };
        }
        return config;
    }
};

export default nextConfig;
