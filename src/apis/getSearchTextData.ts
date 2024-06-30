"use server";

import { cookies } from "next/headers";

export const getSearchTextData = async (searchText: string) => {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search-title?data=${searchText}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("검색결과 에러");
  }

  const data = await res.json();
  return data.result;
};
