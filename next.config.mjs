/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // workbox 안나오게
});

const nextConfig = {
  sassOptions: {
    includePaths: ["styles"],
  },
};

export default withPWA({
  nextConfig,
});
