"use client";

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { EventSourcePolyfill } from "event-source-polyfill";
import TimeRemaining from "@/components/organism/auctionProgress/TimeRemaining";
import { AuctionRoundInfo } from "@/interface/AuctionProgressInfo";
import { AuctionProgressInfoProps } from "@/interface/AuctionProgressInfoProps";
import { useRouter } from "next/navigation";

const AuctionProgressInfo: React.FC<AuctionProgressInfoProps> = ({
  authorization,
  uuid,
  pathName,
}) => {
  const router = useRouter();

  const [roundInfo, setRoundInfo] = useState<AuctionRoundInfo>({
    round: 0,
    roundEndTime: "",
    leftNumberOfParticipants: 0,
    price: 0,
    isActive: true,
  });

  const onClick = async (): Promise<void> => {
    confetti({
      particleCount: 150,
      spread: 60,
    });

    setTimeout(async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/bidding`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
          body: JSON.stringify({
            auctionUuid: pathName,
            biddingPrice: roundInfo.price,
            round: roundInfo.round,
          }),
        }
      );

      const data = await response.json();
      if (!data) {
        alert("이미 입찰 했습니다");
      }
    }, 1500);
  };

  const eventSource = useRef<null | EventSource>(null);

  useEffect(() => {
    const fetchSSE = () => {
      eventSource.current = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/auction-page/${pathName}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        }
      );

      eventSource.current.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.round === null) {
          console.log("데이터가 null입니다. 재연결 시도 중...");
          eventSource.current?.close();
          fetchSSE();
          console.log("연결됨");
          return;
        }

        console.log(data);

        setRoundInfo({
          round: data.round,
          roundEndTime: data.roundEndTime,
          leftNumberOfParticipants: data.leftNumberOfParticipants,
          price: data.price,
          isActive: data.isActive, //data.isActive
        });

        //경매 마감
        if (data.endStatus) {
          router.push(`/paymentStay/${pathName}`);
        }
      };

      eventSource.current.onerror = async () => {
        console.log("에러");
        eventSource.current?.close();
        setTimeout(fetchSSE, 3000);
      };
      eventSource.current.onopen = (event) => {
        console.log("연결 성공:", event);
      };
    };

    fetchSSE();
    return () => {
      eventSource.current?.close();
    };
  }, []);
  return (
    <>
      {roundInfo.isActive && (
        <>
          <div className="roundInfo">{roundInfo.price} 원</div>
          <div className="priceInfo">{roundInfo.round} ROUND</div>
        </>
      )}

      {roundInfo.isActive && roundInfo.roundEndTime && (
        <div className="round-stay-layout">
          <div className="container">
            <div className="wave-one"></div>
            <div className="wave-two"></div>
            <div className="wave-three"></div>
            <div className="wave-four"></div>
            <div className="center-circle-container">
              <div className="center-circle">
                <h2 className="leftCount">
                  {roundInfo.leftNumberOfParticipants}
                </h2>

                <TimeRemaining
                  auctionUuid={pathName}
                  authorization={authorization}
                  endTime={roundInfo.roundEndTime}
                  isActive={roundInfo.isActive}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 입찰전 그리고 라운드진행중 */}
      {roundInfo.isActive && (
        <button className="button" onClick={onClick}>
          <span role="img" aria-label="confetti">
            🎉
          </span>
          <span>입찰하기</span>
        </button>
      )}

      {/* 대기화면 */}
      {!roundInfo.isActive && (
        <div className="round-stay-layout">
          <div className="round-stay">
            <p>
              <span>다음은</span>{" "}
              <span style={{ fontWeight: "bold" }}>{roundInfo.round}</span>{" "}
              <span>ROUND 입니다.</span>
            </p>
            <p>
              <span>입찰가는</span>{" "}
              <span style={{ fontSize: "35px", fontWeight: "bold" }}>
                {roundInfo.price}
              </span>
              <span>원 입니다.</span>
            </p>
          </div>
          <div className="loader" style={{ color: "white" }}>
            <TimeRemaining
              auctionUuid={pathName}
              authorization={authorization}
              endTime={roundInfo.roundEndTime}
              isActive={roundInfo.isActive}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AuctionProgressInfo;
