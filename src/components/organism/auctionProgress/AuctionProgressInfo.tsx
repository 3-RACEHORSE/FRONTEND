"use client";

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
  isActive: any;
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
    isActive: true,
  });

  const [valid, setValid] = useState(false);

  // 입찰 이펙트
  const onClick = async (): Promise<void> => {
    setValid(false);

    confetti({
      particleCount: 150,
      spread: 60,
    });

    console.log(pathName, roundInfo.price, roundInfo);

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

      if (response.status == 200) {
        console.log("입찰성공");
      }
    }, 1500);
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      let eventSource = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/auction-page/${pathName}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authorization}`,
          },
        }
      );

      const handleEventSourceError = () => {
        console.error("EventSource error. Reconnecting...");
        // Attempt to reconnect
        eventSource = new EventSourcePolyfill(
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

          //입찰버튼 활성화
          setValid(true);

          setRoundInfo({
            round: data.round,
            roundEndTime: data.roundEndTime,
            leftNumberOfParticipants: data.leftNumberOfParticipants,
            price: data.price,
            isActive: data.isActive,
          });
        };
        eventSource.onerror = handleEventSourceError;
      };

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);

        //입찰버튼 활성화
        setValid(true);

        setRoundInfo({
          round: data.round,
          roundEndTime: data.roundEndTime,
          leftNumberOfParticipants: data.leftNumberOfParticipants,
          price: data.price,
          isActive: data.isActive,
        });
      };

      eventSource.onerror = handleEventSourceError;

      return () => eventSource.close();
    };

    fetchData();
  }, [authorization, pathName]);

  return (
    <>
      {roundInfo.isActive && (
        <>
          <div className="roundInfo">{roundInfo.price} 원</div>
          <div className="priceInfo">{roundInfo.round} ROUND</div>
        </>
      )}
      {!roundInfo.isActive && (
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
            </span>{" "}
            <span>원 입니다.</span>
          </p>
        </div>
      )}
      <div className="container">
        {roundInfo.isActive && (
          <>
            <div className="wave-one"></div>
            <div className="wave-two"></div>
            <div className="wave-three"></div>
            <div className="wave-four"></div>
          </>
        )}

        <div className="center-circle-container">
          <div className="center-circle">
            {roundInfo.isActive && (
              <h2 className="leftCount">
                {roundInfo.leftNumberOfParticipants}
              </h2>
            )}
            <TimeRemaining
              auctionUuid={pathName}
              authorization={authorization}
              endTime={roundInfo.roundEndTime}
              isActive={roundInfo.isActive}
            />
          </div>
        </div>
      </div>
      {/* 입찰전 그리고 라운드진행중 */}
      {valid && roundInfo.isActive && (
        <button className="button" onClick={onClick}>
          <span role="img" aria-label="confetti">
            🎉
          </span>
          <span>입찰하기</span>
        </button>
      )}
      {/* 입찰후 그리고 라운드 진행중 */}
      {!valid && roundInfo.isActive && (
        <button className="button">
          <span role="img" aria-label="confetti">
            🙌
          </span>
          <span>입찰완료</span>
        </button>
      )}
    </>
  );
};

export default AuctionProgressInfo;
