"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";

interface ProfileInfoProps {
  name: string;
  src?: string;
  categories?: string[];
  handle: string;
  authorization: any;
  uuid: any;
  type: string;
}
export default function ProfileInfo({
  name,
  src,
  categories = [],
  handle,
  authorization,
  uuid,
  type,
}: ProfileInfoProps) {
  console.log(type);

  //구독 표시
  console.log(authorization, uuid);

  const handleSubscribeSeller = async () => {
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
          sellerHandle: handle,
        }),
      }
    );

    console.log(res);
  };

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-img"]}>
        <img src={src} />
      </div>
      <div className={styles["profile-info"]}>
        <p className={styles["profile-info-name"]}>{name}</p>
        {type === "server" && (
          <div
            className={styles["profile-follow-btn"]}
            onClick={handleSubscribeSeller}
          >
            팔로우
          </div>
        )}
        <ul className={styles["profile-info-category"]}>
          {categories.map((category, index) => (
            <p key={index} className={styles["element"]}>
              {category}
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
}
