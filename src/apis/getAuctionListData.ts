"use server";

import { redirect } from "next/navigation";

interface FetchListDataProps {
  pathName: string;
  decodedString: string;
  authorization: string;
  uuid: string;
  pageParam: number;
}

export const getAuctionListData = async ({
  pathName,
  decodedString,
  authorization,
  uuid,
  pageParam,
}: FetchListDataProps) => {
  let url;

  if (pathName === "/auction/progress") {
    // 진행중
    url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/state?state=AUCTION_IS_IN_PROGRESS&page=${pageParam}`;
  } else if (pathName === "/auction/schedule") {
    // 예정
    url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/state?state=BEFORE_AUCTION&page=${pageParam}`;
  } else if (pathName === "/auction/end") {
    // 마감
    url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/state?state=AUCTION_NORMAL_CLOSING&page=${pageParam}`;
  } else if (pathName.startsWith("/auction/local")) {
    // 지역
    url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/local?localName=${decodedString}&page=${pageParam}`;
  } else {
    // 검색결과
    url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/searchList?searchContent=${decodedString}&page=${pageParam}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization,
      uuid,
    },
  });

  if (res.status === 401 || res.status === 500) {
    redirect("https://fe-meetplus.vercel.app/login");
  }

  if (!res.ok) {
    redirect("https://fe-meetplus.vercel.app/login");
  }

  const data = await res.json();
  return data.auctionPostDtos;
};
