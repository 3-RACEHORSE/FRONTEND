"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BoardObjectType } from "@/interface/BoardObjectType";
import BoardObject from "@/components/organism/auction/BoardObject";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { modifyAndDecodeUrl } from "@/utils/text/editPath";
import { getQueryKey } from "@/utils/text/queryKeyUtils";
import { getAuctionListData } from "@/apis/getAuctionListData";

interface ScrollProps {
  authorization?: any;
  uuid: any;
}

export default function Scroll({ authorization, uuid }: ScrollProps) {
  const pathName = usePathname();

  const { ref, inView } = useInView();

  //지역 빼기
  const decodedString: string = modifyAndDecodeUrl(pathName);

  //pathName에 따른 쿼리 키 변경
  const queryKey = getQueryKey(pathName);

  //RQ 설정 및 패칭 관련
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getAuctionListData({
        pathName,
        decodedString,
        authorization,
        uuid,
        pageParam,
      }),
    initialPageParam: 0,
    staleTime: 1000 * 20 * 20,
    gcTime: 300 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    },
    // enabled: false, // 캐시 비활성화
  });

  //최하단 검증 훅
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const content = data?.pages.map((objects: BoardObjectType[]) =>
    objects.map((object, index) => (
      <Link href={`/detail/${object.auctionUuid}`} key={object.auctionUuid}>
        <BoardObject
          src={object.thumbnail}
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
          incrementUnit={object.incrementUnit}
          place={`${object.localName} ${object.eventPlace}`}
          innerRef={index === objects.length - 1 ? ref : undefined}
        />
      </Link>
    ))
  );

  return <main style={{ height: "39.5vh", overflow: "auto" }}>{content}</main>;
}
