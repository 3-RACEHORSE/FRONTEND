"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/profileInfo.module.scss";

interface ProfileInfoProps {
  name: string;
  src?: string;
  categories?: string[];
}
export default function ProfileInfo({
  name,
  src,
  categories = [],
}: ProfileInfoProps) {
  console.log(categories);

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-img"]}>
        <img src={src} />
      </div>
      <div className={styles["profile-info"]}>
        <p className={styles["profile-info-name"]}>{name}</p>
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
