"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";

export default function ProfileInfo() {
  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-img"]}>
        <img src="/dummy/profile.jpg" />
      </div>
      <div className={styles["profile-info"]}>
        <p className={styles["profile-info-name"]}>CHO</p>
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
