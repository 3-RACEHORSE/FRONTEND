"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/boardObject.module.scss";
import { Switch } from "@/components/ui/switch";
import { toggleValid } from "@/utils/auction/toggleValid";
import Swal from "sweetalert2";

interface BoardProps {
  authorization?: any; // 토큰
  uuid?: any; //유유아이디
  isSession?: boolean; // 로그인 되어있는지의 여부
  title: string;
  detail?: string;
  category?: string;
  minPrice?: string;
  startDate?: string;
  endDate?: string;
  auctionUuid?: string;
  isSubscribed?: boolean; // 구독되어있는지의 여부
}

const convertUToKST = (utcDateStr?: string): string => {
  if (!utcDateStr) return "";
  const utcDate = new Date(utcDateStr);
  const kstDate = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000);
  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getDate()).padStart(2, "0");
  const hours = String(kstDate.getHours()).padStart(2, "0");
  const minutes = String(kstDate.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function BoardInfo({
  authorization,
  uuid,
  isSession, // 로그인 여부
  title,
  detail,
  category,
  minPrice,
  startDate,
  endDate,
  auctionUuid,
  isSubscribed, // 구독 여부
}: BoardProps) {
  const [isBookmarked, setIsBookmarked] = useState(isSubscribed); // boolean

  //북마크 등록 api => 이것도 추후 설정 필요
  const handleToggle = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // 이벤트 캡쳐링 막음
    setIsBookmarked(!isBookmarked);

    const text = await toggleValid({
      authorization,
      uuid,
      auctionUuid,
      isBookmarked,
    });
    console.log("서버엑션의 결과값", text);
    if (text === "등록") {
      Swal.fire({
        title: "추가되었습니다!",
        icon: "success",
        showConfirmButton: false,
        timer: 500,
      });
    }
    if (text === "취소") {
      Swal.fire({
        title: "취소되었습니다!!",
        icon: "success",
        showConfirmButton: false,
        timer: 500,
      });
    }
    if (text === "본인") {
      Swal.fire({
        title: "본인글은, 구독하지 못합니다!",
        icon: "warning",
        showConfirmButton: false,
        timer: 500,
      }).then((result) => {
        // 본인글 구독 못하게 하는 로직
        if (result.isConfirmed) {
          setIsBookmarked(!isBookmarked);
        }
      });
    }
  };

  return (
    <>
      <div className={styles["boardObject-element2"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles["boardObject-element2-text1"]}>{title}</p>
          <p className={styles["boardObject-element2-bookmark"]}>
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
          {convertUToKST(startDate)} {"~"} {convertUToKST(endDate)}
        </p>
      </div>
    </>
  );
}
