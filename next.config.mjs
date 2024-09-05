/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "tidelpo.auziqni.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.pexel.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
