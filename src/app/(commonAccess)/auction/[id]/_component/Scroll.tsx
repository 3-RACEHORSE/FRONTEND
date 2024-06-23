"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { boardObject } from "@/lib/interface/boardObject";
import BoardObject from "@/components/organism/auction/BoardObject";
import { redirect, usePathname } from "next/navigation";
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
  } else if (pathName === "/auction/progress") {
    status = "진행중";
  } else if (pathName === "/auction/end") {
    status = "마감";
  } else {
    status = "알 수 없음";
  }
  console.log("받은것", authorization, uuid);

  //지역 빼기
  const removePrefix = (url: string, prefix: string): string => {
    if (url.startsWith(prefix)) {
      return url.slice(prefix.length);
    }
    return url;
  };

  const decodeUrl = (encodedUrl: string): string =>
    decodeURIComponent(encodedUrl);

  const modifyAndDecodeUrl = (url: string): string => {
    let modifiedUrl: string;

    if (url.startsWith("/auction/local")) {
      modifiedUrl = removePrefix(url, "/auction/local");
    } else if (url.startsWith("/auction/search")) {
      modifiedUrl = removePrefix(url, "/auction/search");
    } else {
      modifiedUrl = url;
    }
    return decodeUrl(modifiedUrl);
  };
  const decodedString: string = modifyAndDecodeUrl(pathName);

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
      //검색결과
      url = `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search/searchList?searchContent=${decodedString}&page=${pageParam}`;
    }
    const res = await fetch(url, {
      method: "GET", // 요청 방법 설정
      headers: {
        "Content-Type": "application/json",
        authorization: `${authorization}`,
        uuid: `${uuid}`,
      },
    });
    if (res.status === 401 || res.status === 500) {
      // 이후 에러코드 401로 수정 필요
      console.log("토큰없");
      redirect("https://fe-meetplus.vercel.app/login");
    }
    if (!res.ok) {
      // throw new Error("Network Error");
      redirect("https://fe-meetplus.vercel.app/login");
    }
    const data = await res.json();
    console.log(data.auctionPostDtos);
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
    objects.map((object, index) => (
      <Link href={`/detail/${object.auctionUuid}`} key={object.auctionUuid}>
        <BoardObject
          src={object.thumbnail} // 바꿀것 {object.thumbnail}
          status={
            object.state === "BEFORE_AUCTION"
              ? "예정"
              : object.state === "AUCTION_IS_IN_PROGRESS"
              ? "진행중"
              : object.state === "AUCTION_NORMAL_CLOSING"
              ? "마감"
              : "마감"
          }
          title={object.title}
          startPrice={object.startPrice}
          auctionStartDate={object.auctionStartTime}
          eventStartDate={object.eventStartTime}
          incrementUnit={object.incrementUnit} // 추후 {object.오는키값}으로 바꿔야함
          place={`${object.localName} ${object.eventPlace}`}
          innerRef={index === objects.length - 1 ? ref : undefined}
        />
      </Link>
    ))
  );

  return <main style={{ height: "39.5vh", overflow: "auto" }}>{content}</main>;
}
