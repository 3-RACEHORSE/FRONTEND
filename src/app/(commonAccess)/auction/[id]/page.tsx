"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { boardObject } from "@/lib/interface/boardObject";
import Header from "@/components/organism/layout/Header";
import WriteBar from "@/components/organism/layout/WriteBar";
import NavBar from "@/components/organism/layout/NavBar";
import BoardObject from "@/components/organism/auction/BoardObject";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathName = usePathname();
  let queryKey: (string | undefined)[] = ["object"];
  let keyword: string | undefined;

  //동적으로 쿼리 변경
  if (pathName === "/auction/all") {
    queryKey = ["object"];
  } else if (pathName.startsWith("/auction/")) {
    keyword = pathName.replace("/auction/", "");
    console.log(keyword, "입니다.");
    queryKey = ["object", keyword];
    console.log("queryKey", queryKey);
  }

  const { ref, inView } = useInView();
  const fetchListData = async ({ pageParam }: { pageParam: number }) => {
    const url =
      pathName === "/auction/all"
        ? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?page=${pageParam}`
        : `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?keyword=${keyword}&page=${pageParam}`;
    const res = await fetch(url);
    const data = await res.json();

    return data.searchAllAuctions;
  };

  //추후, search 구현 필요
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey, // 위의 로직에서 path에 따라 변경
    queryFn: fetchListData,
    initialPageParam: 0,
    staleTime: 1000 * 20 * 20,
    gcTime: 300 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  console.log(data);
  const content = data?.pages.map((objects: boardObject[]) =>
    objects.map((object, index) => (
      <BoardObject
        key={object.auctionUuid}
        src={object.thumbnail}
        title={object.title}
        detail={object.content}
        category={object.category}
        minPrice={object.minimumBiddingPrice}
        startDate={object.createdAt}
        endDate={object.endedAt}
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
