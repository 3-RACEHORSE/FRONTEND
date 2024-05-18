"use client";

import styles from "@/styles/organism/boardDetailBar.module.scss";
import dynamic from "next/dynamic";

export default function BoardDetailBar() {
  const FSaved = dynamic(() => import("@/components/atoms/icon/false/FSaved"));

  return (
    <>
      <nav className={styles["nav-container"]}>
        <div className={styles["nav-iconWithText-container"]}>
          <FSaved />
        </div>
        <div className={styles["button-container1"]}>
          <p className={styles["info1"]}>판매자 정보 </p>
          <p className={styles["info2"]}>판매자 정보를 확인하세요!</p>
        </div>
        <div className={styles["button-container2"]}>
          <p className={styles["info3"]}>입찰하기(99,999 ▲) </p>
          <p className={styles["info4"]}>새로운 입찰가</p>
        </div>
      </nav>
    </>
  );
}
