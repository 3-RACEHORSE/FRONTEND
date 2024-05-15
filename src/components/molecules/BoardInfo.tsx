"use client";

import React, { ChangeEvent } from "react";
import styles from "@/styles/organism/boardObject.module.scss";

interface BoardProps {
  title: string;
  detail?: string;
  category?: string;
  minPrice?: string;
  startDate?: string;
  endDate?: string;
}
export default function BoardInfo({
  title,
  detail,
  category,
  minPrice,
  startDate,
  endDate,
}: BoardProps) {
  return (
    <>
      <div className={styles["boardObject-element2"]}>
        <p className={styles["boardObject-element2-text1"]}>{title}</p>
        <p className={styles["boardObject-element2-text2"]}>{detail}</p>
        <div className={styles["boardObject-element2-layout"]}>
          <div className={styles["boardObject-element2-tag1"]}>{category}</div>
          <div className={styles["boardObject-element2-tag2"]}>{minPrice}</div>
        </div>
        <p className={styles["boardObject-element2-text3"]}>
          {startDate} {"~"} {endDate}
        </p>
      </div>
    </>
  );
}
