"use client";

import React, { useState, ChangeEvent } from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/boardObject.module.scss";

interface BoardProps {
  authorization?: any; // 토큰
  uuid?: any; //유유아이디
  isSession: boolean; // 로그인 되어있는지의 여부
  src?: string;
  title: string;
  detail?: string;
  category?: string;
  minPrice?: string;
  startDate?: string;
  endDate?: string;
  auctionUuid?: string;
  isSubscribed?: boolean; // 구독되어있는지의 여부
  innerRef?: React.Ref<HTMLParagraphElement>;
}

export default function BoardObject({
  authorization,
  uuid,
  isSession,
  src,
  title,
  detail,
  category,
  minPrice,
  startDate,
  endDate,
  auctionUuid,
  isSubscribed,
  innerRef,
}: BoardProps) {
  return (
    <div className={styles["boardObject-container"]} ref={innerRef}>
      <div className={styles["boardObject-element1"]}>
        <img
          src={src}
          alt={""}
          style={{
            border: "1px solid #e3e3e3",
            width: "100%",
            height: "100%",
            borderRadius: "5px",
          }}
        />
      </div>
      <BoardInfo
        authorization={authorization}
        uuid={uuid}
        isSession={isSession} // 로그인 되어있는지
        title={title}
        detail={detail}
        category={category}
        minPrice={minPrice}
        startDate={startDate}
        endDate={endDate}
        auctionUuid={auctionUuid}
        isSubscribed={isSubscribed}
      />
    </div>
  );
}
