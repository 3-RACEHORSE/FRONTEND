"use client";

import { useState, TouchEvent } from "react";

const useSwipe = () => {
  const [startX, setStartX] = useState<number>(0);
  const [currentX, setCurrentX] = useState<number>(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

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

  const handleTouchEnd = async (callback: () => Promise<void>) => {
    if (isSwiping) {
      if (-currentX - window.innerWidth / 2 > 0) {
        await callback();
        setIsVisible(false);
      }
      setIsSwiping(false);
      setCurrentX(0);
      setStartX(0);
    }
  };

  return {
    startX,
    currentX,
    isSwiping,
    isVisible,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export default useSwipe;
