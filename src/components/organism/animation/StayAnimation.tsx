"use client";

import React, { useEffect } from "react";
import "@/styles/animation/paymentStay.css";
import { useRouter } from "next/navigation";
import { getAuctionSuccess } from "@/apis/getAuctionSuccess";
import useMessageCarousel from "@/hooks/alarm/useMessageCarousel";

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
  const currentMessage = useMessageCarousel(messages, 4000);
  const router = useRouter();

  useEffect(() => {
    const checkPaymentValidity = async () => {
      await getAuctionSuccess(authorization, auctionUuid, uuid, router);
    };

    setTimeout(() => {
      checkPaymentValidity();
    }, 15000);
  }, [authorization, auctionUuid, uuid, router]);

  return (
    <div className="container">
      <div className="loader fade-in">{currentMessage}</div>
    </div>
  );
};

export default StayAnimation;
