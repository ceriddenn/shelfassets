/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.ibb.co",
                port: "",
            },
            {
                protocol: "https",
                hostname: "*",
                port: "",
            }
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
