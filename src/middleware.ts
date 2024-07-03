import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const session = await auth();
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  // 엑세스 토큰이랑, uuid가 널일경우
  if (authorization === null || uuid === null) {
    return NextResponse.redirect("https://fe-meetplus.vercel.app/login");
  }

  // 로그인을 안했을때 만 해당
  if (!session) {
    return NextResponse.redirect("https://fe-meetplus.vercel.app/login");
  }
}

export const config = {
  // 적용이 되는 곳 선정
  matcher: [
    "/alarm/:path*",
    "/mypage:path*",
    "/chat:path*",
    "/chatRoom/:path*",
    "/auction:path*",
    "/auctionProgress/:path*",
    "/payment/:path*",
    "/paymentStay/:path*",
    "/detail/:path*",
    "/i/flow/profile/:path*",
    "/mypage/resume:path*",
    "/mypage/info:path*",
    "/join:path*",
    "/",
  ],
};
