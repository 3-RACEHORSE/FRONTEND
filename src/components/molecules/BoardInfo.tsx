"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/boardObject.module.scss";
import { Switch } from "@/components/ui/switch";
import { toggleValid } from "@/utils/auction/toggleValid";
import Swal from "sweetalert2";
import { convertUToKST } from "@/utils/common/convertUToKST";
import { truncateText } from "@/utils/common/truncateText";
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
  authorization,
  uuid,
  isSession, // 로그인 여부
  title,
  detail,
  category,
  startPrice,
  auctionStartDate,
  eventStartDate,
  incrementUnit,
  auctionUuid,
  isSubscribed, // 구독 여부
  place,
}: BoardProps) {
  const [isBookmarked, setIsBookmarked] = useState(isSubscribed); // boolean

  const auctionStartTime = convertUToKST(auctionStartDate);
  const eventStartTime = convertUToKST(eventStartDate);

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
          <div>
            <p className={styles["boardObject-element2-text1"]}>
              {truncateText(title, 30)}
            </p>
          </div>

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

        <div>
          <p className={styles["boardObject-element2-text3"]}>
            {/* 나중에 주석 해제 필요 */}
            {/* {startTime} {"~"} {endTime} */}
            경매시작 : {auctionStartDate}
          </p>
          <p className={styles["boardObject-element2-text3"]}>
            {/* 나중에 주석 해제 필요 */}
            {/* {startTime} {"~"} {endTime} */}
            행사시작 : {eventStartDate}
          </p>

          <p className={styles["boardObject-element2-text3"]}>
            {/* 나중에 주석 해제 필요 */}
            {/* {startTime} {"~"} {endTime} */}
            장소 : {place}
          </p>
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
    </>
  );
}
