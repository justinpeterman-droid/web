import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
