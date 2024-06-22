import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/organism/layout/NavBar";
import AuthSession from "@/AuthSession";
import RQProvider from "./RQProvider";
import { useDarkMode } from "@/hooks/common/checkDarkMode";
import { cookies } from "next/headers";

// 뷰포트 수정
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1, // 초기 확대 배율
  maximumScale: 1, // 확대 막기
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "MEET PLUS",
  description: "유명인을 만나고 기부하세요!",
};

const noto = Noto_Sans_KR({
  subsets: ["latin"], // 또는 preload: false
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = cookies().get("mode")?.value;

  let isDarkMode;
  if (mode === "dark") {
    isDarkMode = "#151515";
  } else {
    isDarkMode = "#ffffff";
  }
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
        />
        <meta name="theme-color" content={isDarkMode} />
      </head>
      <body className={noto.className}>
        <AuthSession>
          <RQProvider>{children}</RQProvider>
        </AuthSession>
      </body>
    </html>
  );
}
