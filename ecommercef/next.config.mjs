/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
                protocol: 'http',
                hostname: 'localhost',
                port: '8081',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: '*.pinimg.com',
            },
            {
                protocol: 'https',
                hostname: 'encrypted-tbn2.gstatic.com',
            },
        ],
    },
};

export default nextConfig; // syntaxe ES module