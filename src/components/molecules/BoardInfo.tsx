"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/boardObject.module.scss";
import { Switch } from "@/components/ui/switch";
import { toggleValid } from "@/utils/auction/toggleValid";
import Swal from "sweetalert2";
import { sessionValid } from "@/utils/session/sessionValid";

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

  const handleToggle = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // 이벤트 캡쳐링 막음
    console.log("클라이언트 사이드에서 실행되는 것");
    setIsBookmarked(!isBookmarked);
    console.log(!isBookmarked);
    // 추가적인 절달 로직 필요
    const text = await toggleValid({ auctionUuid });

    if (text === "성공") {
      Swal.fire({
        title: "추가되었습니다!",
        icon: "success",
        showConfirmButton: false,
        timer: 500,
      });
    }
    console.log(text, "의 값입니다");
  };

  //시작시 , 세션 있는지 여부 검사
  const [isSession, setIsSession] = useState(false);

  const handleSession = async () => {
    setIsSession(await sessionValid());
  };

  useEffect(() => {
    handleSession();
  }, []);

  console.log("세션 여부입니다.", isSession);

  return (
    <>
      <div className={styles["boardObject-element2"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles["boardObject-element2-text1"]}>{title}</p>
          <p className={styles["boardObject-element2-bookmark"]}>
            {/* <Switch checked={isBookmarked} onClick={handleToggle} /> */}
            {isSession ? (
              <Switch
                type="submit"
                checked={isBookmarked}
                onClick={handleToggle}
              />
            ) : (
              <></>
            )}
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
