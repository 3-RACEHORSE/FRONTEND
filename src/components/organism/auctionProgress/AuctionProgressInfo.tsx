"use client";

import React, { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
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
          // setTimeout(fetchSSE, 3000);
          fetchSSE();
          console.log("연결됨");
          return;
        }

        //입찰버튼 활성화
        setValid(true);
        console.log(data);

        setRoundInfo({
          round: data.round,
          roundEndTime: data.roundEndTime,
          leftNumberOfParticipants: data.leftNumberOfParticipants,
          price: data.price,
          isActive: data.isActive, //data.isActive
        });
      };

      eventSource.current.onerror = async () => {
        console.log("에러");
        eventSource.current?.close();
        setTimeout(fetchSSE, 3000);
      };
      eventSource.current.onopen = (event) => {
        console.log("onopen");
        console.log("연결 성공:", event);
      };
    };

    fetchSSE();
    console.log("안녕");
    return () => {
      eventSource.current?.close();
    };
  }, [valid]);
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
