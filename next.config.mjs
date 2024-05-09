/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

const nextConfig = {
  sassOptions: {
    includePaths: ["styles"],
  },
};

export default withPWA({
  nextConfig,
});
