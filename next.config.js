/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kerukunanambainabire.com",
        // port: "",
        pathname: "/uploads/*",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
