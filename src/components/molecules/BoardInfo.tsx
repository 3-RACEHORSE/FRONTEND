"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/boardObject.module.scss";
import { Switch } from "@/components/ui/switch";
import { toggleValid } from "@/utils/auction/toggleValid";
import { handleIsBookmarked } from "@/utils/auction/handleIsBookmarked";
import Swal from "sweetalert2";
import { sessionValid } from "@/utils/session/sessionValid";

interface BoardProps {
  authorization?: any; // 토큰
  uuid?: any; //유유아이디
  isSession: boolean; // 로그인 되어있는지의 여부
  title: string;
  detail?: string;
  category?: string;
  minPrice?: string;
  startDate?: string;
  endDate?: string;
  auctionUuid?: string;
  isSubscribed?: boolean; // 구독되어있는지의 여부
}
export default function BoardInfo({
  authorization,
  uuid,
  isSession,
  title,
  detail,
  category,
  minPrice,
  startDate,
  endDate,
  auctionUuid,
  isSubscribed,
}: BoardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  //북마크 등록 api => 이것도 추후 설정 필요
  const handleToggle = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // 이벤트 캡쳐링 막음
    setIsBookmarked(!isBookmarked);

    const text = await toggleValid({ auctionUuid, isBookmarked });
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
  };

  //마운트 시, 세션 있는지 여부 검사
  // const [isSession, setIsSession] = useState(false);

  // const handleSession = async () => {
  //   setIsSession(await sessionValid());
  // };

  // useEffect(() => {
  //   handleSession();
  // }, []);

  // 마운트 이후, 북마크 여부 확인
  // const handleBookmark = async () => {
  //   console.log(
  //     "북마크 되어있는지 여부",
  //     await handleIsBookmarked({ auctionUuid })
  //   );
  //   if (await handleIsBookmarked({ auctionUuid })) {
  //     setIsBookmarked(true);
  //   }
  // };

  // useEffect(() => {
  //   handleBookmark();
  // }, [isSession]);

  return (
    <>
      <div className={styles["boardObject-element2"]}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles["boardObject-element2-text1"]}>{title}</p>
          <p className={styles["boardObject-element2-bookmark"]}>
            {/* {isSession ? ( */}
            <Switch
              type="submit"
              checked={isBookmarked}
              onClick={handleToggle}
            />
            {/* ) : (
              <></>
            )} */}
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
