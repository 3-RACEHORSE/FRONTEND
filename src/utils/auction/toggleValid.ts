"use server";

import { auth } from "@/auth";
import { cookies } from "next/headers";

interface toggleValidProps {
  auctionUuid?: any;
  isBookmarked?: boolean;
}

export async function toggleValid({
  auctionUuid,
  isBookmarked,
}: toggleValidProps) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log("받은 Auction uuid", auctionUuid);
  //북마크 여부에 따른 method 변경
  let METHOD;
  if (isBookmarked) {
    METHOD = "PATCH";
  } else {
    METHOD = "POST";
  }
  console.log(METHOD);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/subscription/auction`,
      {
        method: `${METHOD}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          auctionUuid: auctionUuid,
        }),
      }
    );

    if (res.ok && METHOD === "POST") {
      return "등록";
    }
    if (res.ok && METHOD === "PATCH") {
      return "취소";
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
