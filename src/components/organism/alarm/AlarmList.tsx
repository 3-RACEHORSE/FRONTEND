"use client";

import React, { useState, TouchEvent, FC } from "react";
import Cookies from "js-cookie";
import { IoSearchOutline } from "react-icons/io5";
import Logo from "@/asset/svgs/Logo";
import { GoBell } from "react-icons/go";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { sessionValid } from "@/utils/session/sessionValid";
import path from "path";
import styles from "@/styles/alarm/alarm.module.scss";
import AlarmLogo from "@/asset/svgs/AlarmLogo";

interface AlarmListProps {
  eventType: any;
  alarmUrl: any;
  message: any;
}

const AlarmList: FC<AlarmListProps> = ({ eventType, alarmUrl, message }) => {
  const [startX, setStartX] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    console.log("터치");

    setStartX(e.touches[0].clientX);
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    console.log(startX, currentX, window.innerWidth);
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
        console.log(startX, currentX);
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
      style={{
        background: "#f3f3f3",
        padding: "3%",
        borderRadius: "7px",
        display: "flex",
        transform: isSwiping ? `translateX(${currentX}px)` : "translateX(0)",
        transition: isSwiping ? "none" : "transform 0.3s ease",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AlarmLogo />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p
          style={{
            fontSize: "19px",
            fontWeight: "bold",
          }}
        >
          경매 낙찰 알림!
        </p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default AlarmList;
