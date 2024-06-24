"use client";

import React, { useEffect } from "react";
import "@/styles/animation/paymentStay.css";

const StayAnimation = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.classList.add("loaded");
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="loader">경매가 종료되었습니다.</div>
    </>
  );
};

export default StayAnimation;
