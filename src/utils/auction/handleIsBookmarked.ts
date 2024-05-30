"use server";

import { auth } from "@/auth";
import { cookies } from "next/headers";

interface handleIsBookmarkedProps {
  auctionUuid?: any;
}

export async function handleIsBookmarked({
  auctionUuid,
}: handleIsBookmarkedProps) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log(auctionUuid, uuid, authorization);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/subscription/auction/is-subscribed?auctionUuid=${auctionUuid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      }
    );

    if (res.ok) {
      return true;
    }
  } catch (error) {
    return false;
  }
}
