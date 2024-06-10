import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}

export const config = {
  // 적용이 되는 곳 선정
  matcher: [
    "/mypage:path*",
    "/mypage/resume:path*",
    "/mypage/info:path*",
    "/write:path*",
    "/join:path*",
    "/main:path*",
  ],
};
