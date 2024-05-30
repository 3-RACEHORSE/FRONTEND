"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { boardObject } from "@/lib/interface/boardObject";
import Header from "@/components/organism/layout/Header";
import WriteBar from "@/components/organism/layout/WriteBar";
import NavBar from "@/components/organism/layout/NavBar";
import BoardObject from "@/components/organism/auction/BoardObject";
import { usePathname } from "next/navigation";
import watchListData from "@/constants/watchListData";
import { sessionValid } from "@/utils/session/sessionValid";

export default function Page() {
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
    } else if (category) {
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?category=${keyword}&page=${pageParam}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?keyword=${keyword}&page=${pageParam}`;
    }

    if (isSession) {
      const res = await fetch(url, {
        method: "GET", // 요청 방법 설정
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      });
      const data = await res.json();
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
    staleTime: 1000 * 20 * 20,
    gcTime: 300 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      // 페이지 로직 수정 필요
      const nextPage = lastPage.length ? allPages.length : undefined;
      console.log("페이지 값", nextPage);
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  //로그인 되어있는지 여부 검사
  const [authorization, setAuthorization] = useState<any>(null); // 토큰
  const [uuid, setUuid] = useState<any>(null); // uuid
  const [isSession, setIsSession] = useState<boolean>(false); // 로그인 여부

  const handleSession = async () => {
    const loginValid = await sessionValid();
    if (loginValid) {
      // 로그인 되어있을때
      setAuthorization(loginValid.authorization);
      setUuid(loginValid.uuid);
      setIsSession(loginValid.valid);
    }
  };

  useEffect(() => {
    handleSession();
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  }, []);

  console.log(authorization, uuid, isSession);

  const content = data?.pages.map((objects: boardObject[]) =>
    objects.map((object, index) => (
      <BoardObject
        key={object.auctionUuid}
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
        // isSubscribed={object.isSubscribed} // 북마크 구독 여부
        innerRef={index === objects.length - 1 ? ref : undefined}
      />
    ))
  );

  return (
    <main>
      <Header />
      {content}
      <WriteBar />
      <NavBar />
    </main>
  );
}
