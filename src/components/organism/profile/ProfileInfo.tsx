"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";

interface ProfileInfoProps {
  name: string;
  src?: string;
  detail?: string;
}

export default function ProfileInfo({ name, src, detail }: ProfileInfoProps) {
  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-img"]}>
        <img src={src} />
      </div>
      <div className={styles["profile-info"]}>
        <p className={styles["profile-info-name"]}>{name}</p>
        <button className={styles["profile-info-btn"]}>팔로우</button>
        <ul className={styles["profile-info-category"]}>
          <p className={styles["element"]}>디자인</p>
          <p className={styles["element"]}>IT·프로그래밍</p>
          <p className={styles["element"]}>세무·법무·노무</p>
        </ul>
      </div>
    </div>
  );
}
