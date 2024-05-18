"use client";

import React, { useState, ChangeEvent } from "react";
import styles from "@/styles/organism/boardDetailInfo.module.scss";
import AreaChart from "@/components/organism/chart/AreaChart";

export default function BoardDetailInfo() {
  return (
    <div className={styles["boardDetailInfo-container"]}>
      <div className={styles["title"]}>채결 입찰 내역</div>
      <AreaChart />
      <ul>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
    </div>
  );
}
