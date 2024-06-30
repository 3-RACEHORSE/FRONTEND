"use client";

import React from "react";
import TimeRemaining from "@/components/organism/auctionProgress/TimeRemaining";
import { AuctionProgressInfoProps } from "@/interface/AuctionProgressInfoProps";
import postBidClick from "@/apis/postBidClick";
import useAuctionSSE from "@/hooks/sse/useAuctionSSE";

const AuctionProgressInfo: React.FC<AuctionProgressInfoProps> = ({
  authorization,
  uuid,
  pathName,
}) => {
  const [roundInfo] = useAuctionSSE(authorization, pathName);

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
        <button
          className="button"
          onClick={() => postBidClick(authorization, uuid, pathName, roundInfo)}
        >
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
