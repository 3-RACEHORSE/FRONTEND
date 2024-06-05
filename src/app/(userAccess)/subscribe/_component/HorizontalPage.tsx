"use client";

import SubscribeObject from "@/components/organism/subscribe/SubscribeObject";
import { truncateText } from "@/utils/common/truncateText";
import React, { useState, useEffect, Key } from "react";
import styles from "@/styles/organism/subscribe.module.scss";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
interface Auction {
  userId: Key | null | undefined;
  auctionUuid: string;
  handle: string;
  sellerUuid: string;
  title: string;
  content: string;
  category: string;
  minimumBiddingPrice: number;
  thumbnail: string;
  createdAt: string;
  endedAt: string;
  subscribed: boolean;
}

export default function HorizontalPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}`
      );
      const data = await response.json();
      setAuctions((prevAuctions) => [...prevAuctions, ...data]);
      //   setHasNext(data.hasNext);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //다음페이지
  const handleNextPage = () => {
    if (hasNext && !loading) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center w-full h-200">
        <div className="flex overflow-x-auto">
          {auctions.map((auction, index) => (
            // <li key={index}>
            //   <h2>{auction.title}</h2>
            //   {/* <p>{auction.content}</p> */}
            // </li>
            <SubscribeObject
              key={index}
              src="/dummy/profile.jpg"
              name={truncateText(auction.title, 8)}
            />
          ))}
          {/* <button
            className={styles["nextBtn"]}
            onClick={handleNextPage}
            disabled={!hasNext || loading}
          >
            {loading ? "Loading..." : "Next"}
          </button> */}
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
