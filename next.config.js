/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
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

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX(nextConfig);
