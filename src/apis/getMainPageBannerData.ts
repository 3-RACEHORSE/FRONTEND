"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getMainPageBannerData() {
  const authorization = cookies().get("authorization")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/main`,
    {
      headers: {
        authorization: `Bearer ${authorization}`,
      },
    }
  );
  // console.log(res.status);
  if (res.status === 401 || res.status === 500) {
    redirect("https://fe-meetplus.vercel.app/login");
  }
  if (!res.ok) {
    // throw new Error("Network Error");
    redirect("https://fe-meetplus.vercel.app/login");
  }
  const data = await res.json();
  return data;
}
