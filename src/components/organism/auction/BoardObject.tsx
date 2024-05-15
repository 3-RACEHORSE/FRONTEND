"use client";

import React, { useState, ChangeEvent } from "react";
import styles from "@/styles/organism/boardObject.module.scss";
import Image from "next/image";

export default function BoardObject() {
  return (
    <div className={styles["boardObject-container"]}>
      <div className={styles["boardObject-element1"]}>
        <img
          src={"/dummy/profile.jpg"}
          alt={""}
          style={{
            border: "1px solid #e3e3e3",
            width: "100%",
            height: "100%",
            borderRadius: "5px",
          }}
        />
      </div>
      <div className={styles["boardObject-element2"]}>
        <p className={styles["boardObject-element2-text1"]}>G사 CTO 멘토링</p>
        <p className={styles["boardObject-element2-text2"]}>
          시니어 경력 17년차 프론트엔드 개발자..
        </p>
        <div className={styles["boardObject-element2-layout"]}>
          <div className={styles["boardObject-element2-tag1"]}>
            세무·법무·노무
          </div>
          <div className={styles["boardObject-element2-tag2"]}>
            ✅최소 9,999
          </div>
        </div>
        <p className={styles["boardObject-element2-text3"]}>
          9999.99.99 {"~"} 9999.99.99
        </p>
      </div>
    </div>
  );
}
