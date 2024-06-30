"use client";

import React, { FC } from "react";
import AlarmLogo from "@/asset/svgs/AlarmLogo";
import styles from "@/styles/alarm/alarm.module.scss";
import { calculateRelativeTime } from "@/utils/time/calculateRelativeTime";
import useSwipe from "@/hooks/alarm/useSwipe";
import { deleteAlarm } from "@/apis/deleteAlarm";

interface AlarmListProps {
  eventType: any;
  alarmUrl: any;
  message: any;
  alarmTime?: any;
  id?: any;
  authorization?: any;
  uuid?: any;
}

const AlarmList: FC<AlarmListProps> = ({
  eventType,
  alarmUrl,
  message,
  alarmTime,
  id,
  authorization,
  uuid,
}) => {
  const {
    currentX,
    isSwiping,
    isVisible,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useSwipe();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/notification-service/api/v1/alarm/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(response.status);
    } catch (error) {
      console.error("Error deleting alarm:", error);
    }
  };

  if (!isVisible) return null;

  const brightness = Math.max(1 + currentX / 200, 0.3);

  return (
    <div
      className={`${styles.alarmContainer} ${isSwiping ? styles.swiping : ""}`}
      style={{
        marginTop: "1vh",
        transform: `translateX(${currentX}px)`,
        filter: `brightness(${brightness})`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() =>
        handleTouchEnd(() => deleteAlarm(id, authorization, uuid))
      }
    >
      <AlarmLogo />
      <div className={styles.alarmContent}>
        <div className={styles.alarmLayout}>
          <p className={styles.alarmTitle}>경매 낙찰 알림!</p>
          <p className={styles.alarmTime}>{calculateRelativeTime(alarmTime)}</p>
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AlarmList;
