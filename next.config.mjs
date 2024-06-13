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
  env: {
    NEXT_PUBLIC_REACT_APP_API_URL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
    NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID:
      process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID,
    NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY:
      process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY,
    NEXT_PUBLIC_REACT_APP_AWS_REGION:
      process.env.NEXT_PUBLIC_REACT_APP_AWS_REGION,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default withPWA({
  nextConfig,
});
