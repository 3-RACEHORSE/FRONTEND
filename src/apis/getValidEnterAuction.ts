"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getVaildEnterAuction(pathName: any) {
  const authorization = cookies().get("authorization")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/state/${pathName}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`,
      },
    }
  );

  const valid = await res.json();
  if (!valid) {
    redirect(`http://localhost:3000/detail/${pathName}`);
  }
  return;
}
