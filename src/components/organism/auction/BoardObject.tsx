"use client";

import React from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/boardObject.module.scss";
import { BoardProps } from "@/interface/BoardProps";

export default function BoardObject({
  authorization,
  uuid,
  isSession,
  src,
  status,
  title,
  category,
  startPrice,
  auctionStartDate,
  eventStartDate,
  incrementUnit,
  auctionUuid,
  isSubscribed,
  place,
  innerRef,
}: BoardProps) {
  return (
    <div className={styles["boardObject-container"]} ref={innerRef}>
      <div className={styles["boardObject-element1"]}>
        <img
          src={src}
          alt={""}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "5px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <p className={styles["status"]}>{status}</p>
      </div>
      <BoardInfo
        authorization={authorization}
        uuid={uuid}
        isSession={isSession}
        title={title}
        category={category}
        startPrice={startPrice}
        auctionStartDate={auctionStartDate}
        eventStartDate={eventStartDate}
        incrementUnit={incrementUnit}
        auctionUuid={auctionUuid}
        isSubscribed={isSubscribed}
        place={place}
      />
    </div>
  );
}
