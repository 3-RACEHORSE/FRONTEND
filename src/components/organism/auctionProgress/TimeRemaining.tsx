"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TimeRemainingProps } from "@/interface/TimeRemaining";

const TimeRemaining: React.FC<TimeRemainingProps> = ({
  auctionUuid,
  authorization,
  endTime,
  isActive,
}) => {
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState<number>(-1);
  const [toggle, setToggle] = useState(true); // false일경우, 라운드마감, true일 경우 대기마감

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const endTimeDate = new Date(endTime);
      const timeDiff = (endTimeDate.getTime() - now.getTime()) / 1000;
      const remainingSeconds = Math.floor(timeDiff);

      if (isActive) {
        // 경매중일때
        setRemainingTime(remainingSeconds + 32400); // UTC, KST 차이 간극 하드코딩
        setToggle(false); // 기존에 false로 바꿨던것을 여기서, true로 변경
      } else if (!isActive) {
        // 대기시간일때
        setRemainingTime(remainingSeconds + 32400 - 60); // UTC, KST 차이 간극 하드코딩
        setToggle(true); // 기존에 false로 바꿨던것을 여기서, true로 변경
      }

      if (remainingSeconds <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime, isActive]);

  //경매 마감알림 api
  const triggerAuctionEndNotification = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/auction-close/${auctionUuid}`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );

    if (response.ok) {
      router.push(`/paymentStay/${auctionUuid}`);
    }
  };

  //경매 대기 마감 알림 api
  const triggerStayEndNotification = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/auction-standby-end/${auctionUuid}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authorization}`,
        },
      }
    );
  };

  // 경매 마감알림
  // 0초 그리고 라운드중 그리고
  if (remainingTime == 0 && isActive && !toggle) {
    triggerAuctionEndNotification();
  }

  // 경매 대기중
  // 0초 그리고 대기중 그리고
  if (remainingTime == 0 && !isActive && toggle) {
    triggerStayEndNotification();
  }

  return (
    <div className="leftTime" style={{ color: "#ffffff" }}>
      {isNaN(remainingTime)
        ? "로딩중..."
        : remainingTime === -1
        ? "로딩중..."
        : `남은시간 : ${remainingTime}초`}
    </div>
  );
};

export default TimeRemaining;
