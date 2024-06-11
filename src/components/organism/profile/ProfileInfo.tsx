"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";

interface ProfileInfoProps {
  name: string;
  src?: string;
  handle: string;
  authorization: any;
  uuid: any;
  follow: boolean;
}
export default function ProfileInfo({
  name,
  src,
  handle,
  authorization,
  uuid,
  follow,
}: ProfileInfoProps) {
  //구독여부
  const [subscribe, setSubscribe] = useState<boolean>(follow);

  //구독 표시
  // console.log("구독에 필요한 데이터", handle, authorization, uuid, follow);

  //팔로우 하기
  const handleSubscribeSellerAdd = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/subscription/seller`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          sellerHandle: decodeURIComponent(handle),
        }),
      }
    );

    console.log(res);

    setSubscribe(true);
  };

  //팔로우 취소
  const handleSubscribeSellerCancel = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/subscription/seller`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          sellerHandle: decodeURIComponent(handle),
        }),
      }
    );

    setSubscribe(false);
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-img"]}>
        <img src={src} />
      </div>
      <div className={styles["profile-info"]}>
        <p className={styles["profile-info-name"]}> {name}</p>
        <p className={styles["profile-info-career"]}>🎉 대한민국 가수</p>
        <p className={styles["profile-info-sns"]}>⭐ @iu394192</p>
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
