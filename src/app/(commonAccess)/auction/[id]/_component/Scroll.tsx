"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { boardObject } from "@/lib/interface/boardObject";
import BoardObject from "@/components/organism/auction/BoardObject";
import { usePathname } from "next/navigation";
import watchListData from "@/constants/watchListData";
import Link from "next/link";
import { title } from "process";

interface ScrollProps {
  authorization?: any;
  uuid: any;
}

export default function Scroll({ authorization, uuid }: ScrollProps) {
  //pathName에 따른 게시글 상태
  const pathName = usePathname();
  let status;
  if (pathName === "/auction/schedule") {
    status = "예정";
  } else if (pathName === "/auction/process") {
    status = "진행중";
  } else if (pathName === "/auction/end") {
    status = "마감";
  } else {
    status = "알 수 없음";
  }

  const { ref, inView } = useInView();

  //동적으로 쿼리 변경 => 이부분도 수정 필요
  let queryKey: (string | undefined)[] = ["object"];
  let keyword: string | undefined;
  if (pathName === "/auction/progress") {
    // 전체검색
    queryKey = ["object"];
  } else if (pathName.startsWith("/auction/")) {
    // 카테고리 또는 search 검색
    keyword = pathName.replace("/auction/", "");
    queryKey = ["object", keyword];
  }
  const category = watchListData.find(
    // 카테고리인지 search인지 구분
    (item) => encodeURIComponent(item.label) === keyword
  );

  const fetchListData = async ({ pageParam }: { pageParam: number }) => {
    let url;

    if (pathName === "/auction/progress") {
      // 진행중
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search?auctionState=AUCTION_IS_IN_PROGRESS&page=${pageParam}`;
    } else if (pathName === "/auction/schedule") {
      // 예정
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search?auctionState=BEFORE_AUCTION&page=${pageParam}`;
    } else if (pathName === "/auction/end") {
      // 마감
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search?auctionState=AUCTION_NORMAL_CLOSING&page=${pageParam}`;
    } else if (category) {
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?category=${keyword}&page=${pageParam}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?keyword=${keyword}&page=${pageParam}`;
    }
    const res = await fetch(url, {
      method: "GET", // 요청 방법 설정
      headers: {
        "Content-Type": "application/json",
        authorization: `${authorization}`,
        uuid: `${uuid}`,
      },
    });
    const data = await res.json();
    return data.auctionPostDtos;
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: fetchListData,
    initialPageParam: 0,
    staleTime: 1000 * 20 * 20, // 1000 * 20 * 20
    gcTime: 300 * 1000, // 300 * 1000

    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    },
    // enabled: false, // 캐시 비활성화
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const content = data?.pages.map((objects: boardObject[]) =>
    objects.map((object) => (
      <Link href={`/detail/${object.auctionUuid}`} key={object.auctionUuid}>
        <BoardObject
          src="/dummy/profile.jpg" // 바꿀것 {object.thumbnail}
          status={status}
          title={object.title}
          startPrice={object.startPrice}
          auctionStartDate={object.auctionStartTime}
          eventStartDate={object.eventStartTime}
          incrementUnit={50000} // 추후 {object.오는키값}으로 바꿔야함
          place={object.eventPlace}
        />
      </Link>
    ))
  );

  return <main>{content}</main>;
}
