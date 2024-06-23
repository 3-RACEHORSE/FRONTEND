"use client";

import React, { useState, ChangeEvent } from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/boardObject.module.scss";

interface BoardProps {
  authorization?: any; // 토큰
  uuid?: any; //유유아이디
  isSession?: boolean; // 로그인 되어있는지의 여부
  src?: string;
  status?: string;
  title: string;
  detail?: string;
  category?: string;
  startPrice?: string;
  auctionStartDate?: string;
  eventStartDate?: string;
  incrementUnit?: any;
  auctionUuid?: string;
  isSubscribed?: boolean; // 구독되어있는지의 여부
  place?: string;
  innerRef?: React.Ref<HTMLParagraphElement>;
}

export default function BoardObject({
  authorization,
  uuid,
  isSession,
  src,
  status,
  title,
  detail,
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
        isSession={isSession} // 로그인 되어있는지
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
