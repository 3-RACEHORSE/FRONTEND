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
              7시간 남음🕛
            </p>
          </div>
        </div>
      </div>
      <div className={styles["boardDetail-element2"]}>
        <p className={styles["boardDetail-element2-content1"]}>최소 경매가</p>
        <p className={styles["boardDetail-element2-content2"]}>99,999 원</p>
        <p className={styles["boardDetail-element2-content3"]}>
          G사 CTO 멘토링
        </p>
        <p className={styles["boardDetail-element2-content4"]}>
          시니어 경력 17년차 프론트엔드 입니다. 리엑트를 기반으로 웹개발을
          진행하며 멘토링 및 취업 전략 강의 6년차 입니다. 많은 수료생을 배출
          했으며, 1개월안에 취업 보장합니다.
        </p>
      </div>
    </>
  );
}
