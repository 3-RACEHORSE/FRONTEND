"use client";

import "@/styles/auctionProgress/auctionProgress.css";

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
  return (
    <div className="container">
      <div className="circle">
        <div className="wave-one"></div>
        <div className="wave-two"></div>
        <div className="wave-three"></div>
        <div className="wave-four"></div>
        <div className="center-circle-container">
          <div className="center-circle"></div>
        </div>
      </div>
    </div>
  );
}
