"use client";

import React, { ChangeEvent } from "react";
import { usePathname } from "next/navigation";

import CategoryText from "../atoms/Text/CategoryText";
import styles from "@/styles/molecules/boardCategory.module.scss";
import Link from "next/link";

export default function BoardCategory() {
  const pathNmae = usePathname();
  console.log("auction pathNmae", pathNmae);
  return (
    <div className={styles["boardCategory-container"]}>
      <Link
        href="/auction/all"
        className={styles["boardCategory-container-element"]}
      >
        {pathNmae === "/auction/all" ? (
          <div className={styles["boardCategory-container-element-valid"]}>
            전체
          </div>
        ) : (
          <div className={styles["boardCategory-container-element-invalid"]}>
            전체
          </div>
        )}
      </Link>
      <Link
        href="/auction/subscribe"
        className={styles["boardCategory-container-element"]}
      >
        {pathNmae === "/auction/subscribe" ? (
          <div className={styles["boardCategory-container-element-valid"]}>
            구독
          </div>
        ) : (
          <div className={styles["boardCategory-container-element-invalid"]}>
            구독
          </div>
        )}
      </Link>
      <Link
        href="/auction/category"
        className={styles["boardCategory-container-element"]}
      >
        {pathNmae === "/auction/category" ? (
          <div className={styles["boardCategory-container-element-valid"]}>
            카테고리
          </div>
        ) : (
          <div className={styles["boardCategory-container-element-invalid"]}>
            카테고리
          </div>
        )}
      </Link>
    </div>
  );
}
