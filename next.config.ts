import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/services",
        permanent: false,
      },
      {
        source: "/work/:slug",
        destination: "/services",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/about#connect",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
