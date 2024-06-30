"use client";

import styles from "@/styles/layout/header.module.scss";
import AlarmConnect from "@/components/organism/alarm/AlarmConnect";

export default function ChatHeader() {
  return (
    <header className={styles["auction-header-layout"]}>
      <div className={styles["main-header-container"]}>
        <AlarmConnect />
      </div>
      <div style={{ paddingLeft: "3%", paddingRight: "3%" }}>
        <img src="/images/banner/adv1.png" />
      </div>
    </header>
  );
}
