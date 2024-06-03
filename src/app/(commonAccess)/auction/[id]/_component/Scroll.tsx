"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { boardObject } from "@/lib/interface/boardObject";
import BoardObject from "@/components/organism/auction/BoardObject";
import { usePathname } from "next/navigation";
import watchListData from "@/constants/watchListData";
import Link from "next/link";

interface ScrollProps {
  authorization?: any;
  uuid: any;
  isSession: boolean;
}

export default function Scroll({
  authorization,
  uuid,
  isSession,
}: ScrollProps) {
  const pathName = usePathname();

  const { ref, inView } = useInView();

  //동적으로 쿼리 변경
  let queryKey: (string | undefined)[] = ["object"];
  let keyword: string | undefined;
  if (pathName === "/auction/all") {
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

    if (pathName === "/auction/all") {
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?page=${pageParam}`;
      console.log(1);
    } else if (category) {
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?category=${keyword}&page=${pageParam}`;
      console.log(2);
    } else {
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?keyword=${keyword}&page=${pageParam}`;
      console.log(3);
    }

    if (isSession) {
      const res = await fetch(url, {
        method: "GET", // 요청 방법 설정
        headers: {
          "Content-Type": "application/json",
          authorization: `${authorization}`,
          uuid: `${uuid}`,
        },
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      return data.auctionAndIsSubscribedDtos;
    } else {
      const res = await fetch(url);
      const data = await res.json();
      return data.auctionAndIsSubscribedDtos;
    }
  };

  //추후, search 구현 필요
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey, // 위의 로직에서 path에 따라 변경
    queryFn: fetchListData,
    initialPageParam: 0,
    staleTime: 1000 * 20 * 2, // 1000 * 20 * 20
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

  console.log(authorization, uuid, isSession);

  const content = data?.pages.map((objects: boardObject[]) =>
    objects.map((object, index) => (
      <Link href={`/detail/${object.auctionUuid}`} key={object.auctionUuid}>
        <BoardObject
          authorization={authorization}
          uuid={uuid}
          isSession={isSession} // 로그인 되어있는지
          src={object.thumbnail}
          title={object.title}
          detail={object.content}
          category={object.category}
          minPrice={object.minimumBiddingPrice}
          startDate={object.createdAt}
          endDate={object.endedAt}
          auctionUuid={object.auctionUuid}
          isSubscribed={object.subscribed} // 북마크 구독 여부
          innerRef={index === objects.length - 1 ? ref : undefined}
        />
      </Link>
    ))
  );

  return <main>{content}</main>;
}
