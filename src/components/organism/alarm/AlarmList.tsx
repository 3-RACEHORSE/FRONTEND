"use client";

import React, { useState, TouchEvent, FC } from "react";
import AlarmLogo from "@/asset/svgs/AlarmLogo";
import styles from "@/styles/alarm/alarm.module.scss";

interface AlarmListProps {
  eventType: any;
  alarmUrl: any;
  message: any;
  alarmTime?: any;
}

const AlarmList: FC<AlarmListProps> = ({
  eventType,
  alarmUrl,
  message,
  alarmTime,
}) => {
  const [startX, setStartX] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const calculateRelativeTime = (utcTime: string) => {
    const now = new Date();
    const utcDate = new Date(utcTime);
    const diffMilliseconds = now.getTime() - utcDate.getTime();
    // console.log(utcDate.getTime());
    const diffSeconds = Math.abs(diffMilliseconds - 32400) / 1000;

    const days = Math.floor(diffSeconds / 86400);
    const hours = Math.floor(diffSeconds / 3600) % 24;
    const minutes = Math.floor(diffSeconds / 60) % 60;

    if (days > 0) {
      if (days === 1) {
        return `1일전`;
      } else {
        return `${days}일전`;
      }
    } else if (hours > 0) {
      return `${hours}시간전`;
    } else {
      return `${minutes} 분전`;
    }
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isSwiping) {
      const touchX = e.touches[0].clientX;
      const deltaX = touchX - startX;
      if (deltaX < 0) {
        setCurrentX(deltaX);
      }
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping) {
      if (-currentX - window.innerWidth / 2 > 0) {
        setIsVisible(false);
      }
      setIsSwiping(false);
      setCurrentX(0);
      setStartX(0);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.alarmContainer} ${isSwiping ? styles.swiping : ""}`}
      style={{ marginTop: "1vh", transform: `translateX(${currentX}px)` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
