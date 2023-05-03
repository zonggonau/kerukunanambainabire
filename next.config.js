/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.kerukunanambainabire.com",
        // port: "",
        pathname: "/uploads/*",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
