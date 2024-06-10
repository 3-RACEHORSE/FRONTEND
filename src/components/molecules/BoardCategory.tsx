"use client";

import React, { ChangeEvent } from "react";
import { usePathname } from "next/navigation";

import CategoryText from "../atoms/Text/CategoryText";
import styles from "@/styles/molecules/boardCategory.module.scss";
import Link from "next/link";

export default function BoardCategory() {
  const pathNmae = usePathname();
  let pathWithoutAuction = decodeURIComponent(
    pathNmae.replace("/auction/", "")
  );

  console.log("auction pathNmae", pathNmae);

  if (pathNmae === "/auction/all") {
    pathWithoutAuction = "검색";
  }
  return (
    <div className={styles["boardCategory-container"]}>
      {/* <Link
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
        href="/search"
        className={styles["boardCategory-container-element"]}
      >
        {pathNmae === `/auction/${encodeURIComponent(pathWithoutAuction)}` ? (
          <div className={styles["boardCategory-container-element-valid"]}>
            {pathWithoutAuction}
          </div>
        ) : (
          <div className={styles["boardCategory-container-element-invalid"]}>
            {pathWithoutAuction}
          </div>
        )}
      </Link> */}
      <div className={styles["boardCategory-list"]}>
        <div className={styles["boardCategory-list-element"]}>진행중</div>
        <div className={styles["boardCategory-list-element-invalid"]}>예정</div>
        <div className={styles["boardCategory-list-element-invalid"]}>마감</div>
      </div>
    </div>
  );
}
