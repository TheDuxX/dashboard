/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "illwfnxapeovbvjjlbee.supabase.co",
      },
    ],
  },
};

export default nextConfig;
