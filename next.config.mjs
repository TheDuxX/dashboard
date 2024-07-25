/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "trpxvxjnxygldjddxgpz.supabase.co",
      },
    ],
  },
};

export default nextConfig;
