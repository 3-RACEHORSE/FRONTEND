"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";

interface ProfileInfoProps {
  name: string;
  src?: string;
  authorization: any;
  uuid: any;
  description?: any;
  birth?: any;
  influencerUuid?: any;
}
export default function ProfileInfo({
  name,
  src,
  authorization,
  uuid,
  description,
  birth,
  influencerUuid,
}: ProfileInfoProps) {
  //구독여부 조회
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/subscription/influencer/${influencerUuid}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setSubscribe(data);
      }
    };

    checkSubscriptionStatus();
  }, []);

  //구독여부
  const [subscribe, setSubscribe] = useState<boolean>(false);

  //팔로우 하기
  const handleSubscribeSellerAdd = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/subscription/influencer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          influencerUuid: influencerUuid,
        }),
      }
    );

    console.log(res.status);

    setSubscribe(true);
  };

  //팔로우 취소
  const handleSubscribeSellerCancel = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/subscription/influencer`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          influencerUuid: influencerUuid,
        }),
      }
    );

    console.log(res.status);
    setSubscribe(false);
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-img"]}>
        <img src={src} />
      </div>
      <div className={styles["profile-info"]}>
        <p className={styles["profile-info-name"]}> {name}</p>
        <p className={styles["profile-info-career"]}>
          🎉 {birth ? birth : "비공개"}
        </p>
        <p className={styles["profile-info-sns"]}>⭐ {description}</p>
        {subscribe && (
          <div
            className={styles["profile-follow-btn"]}
            onClick={handleSubscribeSellerCancel}
          >
            팔로우 취소
          </div>
        )}
        {!subscribe && (
          <div
            className={styles["profile-follow-btn"]}
            onClick={handleSubscribeSellerAdd}
          >
            팔로우
          </div>
        )}
      </div>
    </div>
  );
}
