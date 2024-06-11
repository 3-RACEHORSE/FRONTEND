"use client";

import React, { ChangeEvent } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/molecules/boardCategory.module.scss";
import Link from "next/link";

export default function BoardCategory() {
  const pathName = usePathname();

  return (
    <div className={styles["boardCategory-container"]}>
      <div className={styles["boardCategory-list"]}>
        <Link
          href="/auction/progress"
          className={styles["boardCategory-list-link"]}
        >
          {pathName === "/auction/progress" && (
            <div className={styles["boardCategory-list-element"]}>진행중</div>
          )}
          {pathName !== "/auction/progress" && (
            <div className={styles["boardCategory-list-element-invalid"]}>
              진행중
            </div>
          )}
        </Link>
        <Link
          href="/auction/schedule"
          className={styles["boardCategory-list-link"]}
        >
          {pathName === "/auction/schedule" && (
            <div className={styles["boardCategory-list-element"]}>예정</div>
          )}
          {pathName !== "/auction/schedule" && (
            <div className={styles["boardCategory-list-element-invalid"]}>
              예정
            </div>
          )}
        </Link>
        <Link href="/auction/end" className={styles["boardCategory-list-link"]}>
          {pathName === "/auction/end" && (
            <div className={styles["boardCategory-list-element"]}>마감</div>
          )}
          {pathName !== "/auction/end" && (
            <div className={styles["boardCategory-list-element-invalid"]}>
              마감
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
