"use client";

import React, { useState, useEffect } from "react";

interface TimeProps {
  endedAtMilliseconds: number; // 토큰
}

const formatTime = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return `${hours}시간 ${minutes}분 ${seconds}초`;
};

export default function RemainTime({ endedAtMilliseconds }: TimeProps) {
  const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const remainingTime = endedAtMilliseconds - currentTime;
  const formattedTime = formatTime(remainingTime);

  return <div>남은 시간: {formattedTime}</div>;
}
