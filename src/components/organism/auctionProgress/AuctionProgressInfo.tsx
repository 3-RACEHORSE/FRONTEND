"use client";

// AuctionProgressInfo.tsx
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { EventSourcePolyfill } from "event-source-polyfill";
import TimeRemaining from "@/components/organism/auctionProgress/TimeRemaining";

interface AuctionProgressInfoProps {
  authorization?: any;
  uuid?: any;
  pathName?: any;
}

interface AuctionRoundInfo {
  round: number;
  roundEndTime: string;
  leftNumberOfParticipants: number;
  price: any;
}

const AuctionProgressInfo: React.FC<AuctionProgressInfoProps> = ({
  authorization,
  uuid,
  pathName,
}) => {
  const [roundInfo, setRoundInfo] = useState<AuctionRoundInfo>({
    round: 0,
    roundEndTime: "",
    leftNumberOfParticipants: 0,
    price: 0,
  });

  // 입찰 이펙트
  const onClick = (): void => {
    confetti({
      particleCount: 150,
      spread: 60,
    });
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      const eventSource = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/auction-page/${pathName}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        }
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        setRoundInfo({
          round: data.round,
          roundEndTime: data.roundEndTime,
          leftNumberOfParticipants: data.leftNumberOfParticipants,
          price: data.price,
        });
      };

      eventSource.onerror = (error) => {
        console.error("EventSource error:", error);
        eventSource.close();
      };

      return () => eventSource.close();
    };

    fetchData();
  }, [authorization, pathName]);

  return (
    <>
      <div className="roundInfo">{roundInfo.round} ROUND</div>
      <div className="priceInfo">{roundInfo.price}</div>
      <div className="container">
        <div className="wave-one"></div>
        <div className="wave-two"></div>
        <div className="wave-three"></div>
        <div className="wave-four"></div>
        <div className="center-circle-container">
          <div className="center-circle">
            <h2 className="leftCount">{roundInfo.leftNumberOfParticipants}</h2>
            <TimeRemaining
              auctionUuid={pathName}
              authorization={authorization}
              endTime={roundInfo.roundEndTime}
            />
          </div>
        </div>
      </div>
      <button className="button" onClick={onClick}>
        <span role="img" aria-label="confetti">
          🎉
        </span>
        <span>입찰하기</span>
      </button>{" "}
    </>
  );
};

export default AuctionProgressInfo;
