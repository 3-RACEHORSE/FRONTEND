"use client";

import React, { useState } from "react";
import styles from "@/styles/organism/boardObject.module.scss";
import { Switch } from "@/components/ui/switch";
import Swal from "sweetalert2";
import { convertUToKST } from "@/utils/time/convertUToKST";
import { truncateText } from "@/utils/text/truncateText";
interface BoardProps {
  authorization?: any; // 토큰
  uuid?: any; //유유아이디
  isSession?: boolean; // 로그인 되어있는지의 여부
  title: string;
  detail?: string;
  category?: string;
  startPrice?: string;
  auctionStartDate?: string;
  eventStartDate?: string;
  incrementUnit?: string;
  auctionUuid?: string;
  isSubscribed?: boolean; // 구독되어있는지의 여부
  place?: string;
}

export default function BoardInfo({
  title,
  startPrice,
  auctionStartDate,
  eventStartDate,
  incrementUnit,
  place,
}: BoardProps) {
  const auctionStartTime = convertUToKST(auctionStartDate);
  const eventStartTime = convertUToKST(eventStartDate);

  return (
    <div className={styles["boardObject-element2"]}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p className={styles["boardObject-element2-text1"]}>
            {truncateText(title, 30)}
          </p>
        </div>
      </div>

      <div>
        <p className={styles["boardObject-element2-text3"]}>
          경매시작 : {auctionStartTime}
        </p>
        <p className={styles["boardObject-element2-text3"]}>
          행사시작 : {eventStartTime}
        </p>

        <p className={styles["boardObject-element2-text3"]}>장소 : {place}</p>
      </div>

      <div>
        <div className={styles["boardObject-element2-layout"]}>
          <div className={styles["boardObject-element2-tag1"]}>
            시작가 {startPrice}
          </div>
          <div className={styles["boardObject-element2-tag2"]}>
            단위가 {incrementUnit}
          </div>
        </div>
      </div>
    </div>
  );
}
