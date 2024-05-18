"use client";

import React, { useState, ChangeEvent } from "react";
import styles from "@/styles/organism/boardDetail.module.scss";

export default function BoardDetail() {
  return (
    <>
      <div className={styles["boardDetail-container"]}>
        <img
          src="/dummy/profile.jpg"
          alt={""}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className={styles["boardDetail-element1"]}>
        <div className={styles["boardDetail-element1-content"]}>
          <div className={styles["boardDetail-element1-content-title"]}>
            <p className={styles["deadline"]}>마감시간</p>
            <p className={styles["deadlineNotice"]}>
              마감시간 이후, 최고 금액의 입찰자와 매칭이 됩니다.
            </p>
          </div>
          <div className={styles["boardDetail-element1-content-info"]}>
            <p className={styles["boardDetail-element1-content-info1"]}>
              9999.99.99 까지
            </p>
            <p className={styles["boardDetail-element1-content-info2"]}>
              7시간 이후 마감
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
