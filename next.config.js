/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    assetPrefix: "/limesurvey-crossroad/",
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    output: "export",
    reactStrictMode: true,
    images: { unoptimized: true },
};

module.exports = nextConfig