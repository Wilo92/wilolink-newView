import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
       
        source: "/:all*(mp4|webp|png|jpg|jpeg|ico|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;