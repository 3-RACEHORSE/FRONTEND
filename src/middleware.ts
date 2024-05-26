import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function middleware() {
  const session = await auth();
  // console.log(session);
  if (!session) {
    // return NextResponse.redirect("http://localhost:3000/login");
  }
}

export const config = {
  //미들웨어 적용 필요
  // matcher: ["/join/easy:path*", "/join/integrated:path*", "/mypage:path*"],
};
