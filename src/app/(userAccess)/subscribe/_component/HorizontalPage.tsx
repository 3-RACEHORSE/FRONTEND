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

interface HorizontalPageProps {
  authorization: any;
  uuid: any;
}

export default function HorizontalPage({
  authorization,
  uuid,
}: HorizontalPageProps) {
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/subscription/seller?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
        }
      );
      const data = await res.json();
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

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={!hasNext || loading}
            style={{
              alignContent: "center",
              marginLeft: "5%",
              marginRight: "5%",
              //   background: "red",
              marginTop: "17px",
              color: "black",
            }}
          >
            <ChevronRight className="h-4 w-40" />
          </Button>
        </div>
      </div>
    </div>
  );
}
