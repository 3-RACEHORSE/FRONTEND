"use client";

import React, { useState } from "react";
import styles from "@/styles/organism/boardObject.module.scss";
import { Switch } from "@/components/ui/switch";
import { myAction } from "@/lib/action";
interface BoardProps {
  title: string;
  detail?: string;
  category?: string;
  minPrice?: string;
  startDate?: string;
  endDate?: string;
}
export default function BoardInfo({
  title,
  detail,
  category,
  minPrice,
  startDate,
  endDate,
}: BoardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // const handleToggle = (e: { preventDefault: () => void }) => {
  //   e.preventDefault(); // 이벤트 캡쳐링 막음
  //   setIsBookmarked(!isBookmarked);
  //   console.log(!isBookmarked);
  // };

  return (
    <>
      <div className={styles["boardObject-element2"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles["boardObject-element2-text1"]}>{title}</p>
          <form action={myAction}>
            <p className={styles["boardObject-element2-bookmark"]}>
              {/* <Switch checked={isBookmarked} onClick={handleToggle} /> */}
              <Switch type="submit" />
            </p>
          </form>
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
