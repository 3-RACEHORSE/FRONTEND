"use client";

import React, { ChangeEvent } from "react";
import styles from "@/styles/main/main.module.scss";

interface BoardProps {
  src?: string;
  category?: string;
}

export default function ImgWithCategory({ src, category }: BoardProps) {
  return (
    <>
      <div className={styles["boardContainer"]}>
        <img src={src} alt="" className={styles["boardImage"]} />
        <div className={styles["categoryLabel"]}>{category}</div>
      </div>
    </>
  );
}
