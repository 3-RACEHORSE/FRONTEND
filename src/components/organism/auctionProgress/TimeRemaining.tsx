import React, { useEffect, useState } from "react";
import { convertUToKST } from "@/utils/common/convertUToKST";

interface TimeRemainingProps {
  auctionUuid?: any;
  authorization?: any;
  endTime: string;
}

const TimeRemaining: React.FC<TimeRemainingProps> = ({
  auctionUuid,
  authorization,
  endTime,
}) => {
  const [remainingTime, setRemainingTime] = useState<number>(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      console.log("utc받은 데이터입니다.", endTime, "지금시간입니다", now);
      const endTimeDate = new Date(endTime);
      const timeDiff = (endTimeDate.getTime() - now.getTime()) / 1000;
      const remainingSeconds = Math.floor(timeDiff);

      setRemainingTime(remainingSeconds + 32400); // UTC, KST 차이 간극 하드코딩

      if (remainingSeconds <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

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
      console.log(response.status);
      console.log("마감요청 성공");
    }
    // if (!response.ok) {
    //   throw new Error("Failed to send notification");
    // }

    //   const data = await response.json();
    //   console.log(data); // Log response data if needed
  };

  //경매 마감알림
  if (remainingTime == 0) {
    triggerAuctionEndNotification();
  }

  return <div className="leftTime">남은시간 : {remainingTime}초</div>;
};

export default TimeRemaining;
