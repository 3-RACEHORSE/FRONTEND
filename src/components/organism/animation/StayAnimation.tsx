"use client";

import React, { useEffect, useState } from "react";
import "@/styles/animation/paymentStay.css";
import { redirect, useRouter } from "next/navigation";

interface StayAnimationProps {
  authorization: any;
  auctionUuid: any;
  uuid: any;
}

const StayAnimation = ({
  authorization,
  auctionUuid,
  uuid,
}: StayAnimationProps) => {
  const messages = [
    "경매가 종료되었습니다.",
    "고생하셨습니다.",
    "낙찰자는 결제페이지로 이동합니다",
    "행복한 하루되세요!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* 결제 유효 확인*/
  const fetchData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/result/${auctionUuid}`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // false면, 메인페이지
    // true면, 결제페이지로
    // {
    //   "price" : 0,
    //   "bidder" : true
    // }
    if (data.bidder) {
      redirect(`http://localhost:3000/payment/${auctionUuid}`);
    }

    console.log(data);
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 15000);
  }, []);

  return (
    <>
      <div className="loader fade-in">{messages[currentMessageIndex]}</div>
    </>
  );
};

export default StayAnimation;
