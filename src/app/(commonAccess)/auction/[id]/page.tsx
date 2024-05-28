"use client";

import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { boardObject } from "@/lib/interface/boardObject";
import Header from "@/components/organism/layout/Header";
import WriteBar from "@/components/organism/layout/WriteBar";
import NavBar from "@/components/organism/layout/NavBar";
import BoardObject from "@/components/organism/auction/BoardObject";

export default function Page() {
  const { ref, inView } = useInView();
  const fetchListData = async ({ pageParam }: { pageParam: number }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/search?page=${pageParam}`
    );
    const data = await res.json();

    return data.searchAllAuctions;
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["object"],
    queryFn: fetchListData,
    initialPageParam: 0,
    staleTime: 1000 * 20 * 20,
    gcTime: 300 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const content = data?.pages.map((objects: boardObject[]) =>
    objects.map((object, index) => {
      if (objects.length == index + 1) {
        return (
          <BoardObject
            key={object.auctionUuid}
            src={object.thumbnail}
            title={object.title}
            detail={object.content}
            category={object.category}
            minPrice={object.minimumBiddingPrice}
            startDate={object.createdAt}
            endDate={object.endedAt}
            innerRef={ref}
          />
        );
      }
      return (
        <BoardObject
          key={object.auctionUuid}
          src={object.thumbnail}
          title={object.title}
          detail={object.content}
          category={object.category}
          minPrice={object.minimumBiddingPrice}
          startDate={object.createdAt}
          endDate={object.endedAt}
        />
      );
    })
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <main>
      <Header />
      {content}
      <WriteBar />
      <NavBar />
    </main>
  );
}
