"use client";

import "@/styles/auctionProgress/auctionProgress.css";
import confetti from "canvas-confetti";

interface AuctionProgressInfoProps {
  authorization?: any;
  uuid?: any;
  pathName?: any;
}

export default function AuctionProgressInfo({
  authorization,
  uuid,
  pathName,
}: AuctionProgressInfoProps) {
  const onClick = (): void => {
    confetti({
      particleCount: 150,
      spread: 60,
    });
  };

  return (
    <>
      <div className="roundInfo">7ROUND</div>
      <div className="priceInfo">1,000,000</div>
      <div className="container">
        <div className="wave-one"></div>
        <div className="wave-two"></div>
        <div className="wave-three"></div>
        <div className="wave-four"></div>
        <div className="center-circle-container">
          <div className="center-circle">
            <h2 className="leftCount">17</h2>
            <div className="leftTime">남은시간 : 9999.99.99</div>
          </div>
        </div>
      </div>
      {/* <button className="bidBtn">입찰하기</button> */}
      <button className="button" onClick={onClick}>
        <span role="img" aria-label="confetti">
          🎉
        </span>
        <span>입찰하기</span>
      </button>{" "}
    </>
  );
}
