"use client";

import React, { useState } from "react";
import styles from "@/styles/organism/boardObject.module.scss";
import { Switch } from "@/components/ui/switch";
import { toggleValid } from "@/utils/auction/toggleValid";
interface BoardProps {
  title: string;
  detail?: string;
  category?: string;
  minPrice?: string;
  startDate?: string;
  endDate?: string;
  auctionUuid?: string;
}
export default function BoardInfo({
  title,
  detail,
  category,
  minPrice,
  startDate,
  endDate,
  auctionUuid,
}: BoardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleToggle = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // 이벤트 캡쳐링 막음
    console.log("클라이언트 사이드에서 실행되는 것");
    setIsBookmarked(!isBookmarked);
    console.log(!isBookmarked);
    toggleValid({ auctionUuid });
  };

  return (
    <>
      <div className={styles["boardObject-element2"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles["boardObject-element2-text1"]}>{title}</p>
          <p className={styles["boardObject-element2-bookmark"]}>
            {/* <Switch checked={isBookmarked} onClick={handleToggle} /> */}
            <Switch
              type="submit"
              checked={isBookmarked}
              onClick={handleToggle}
            />
          </p>
        </div>
        <p className={styles["boardObject-element2-text2"]}>{detail}</p>
        <div className={styles["boardObject-element2-layout"]}>
          <div className={styles["boardObject-element2-tag1"]}>{category}</div>
          <div className={styles["boardObject-element2-tag2"]}>
            ✅{minPrice}
          </div>
        </div>
        <p className={styles["boardObject-element2-text3"]}>
          {startDate} {"~"} {endDate}
        </p>
      </div>
    </>
  );
}
