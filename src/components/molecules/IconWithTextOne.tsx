import React, { ChangeEvent } from "react";

import styles from "@/styles/molecules/iconWithText.module.scss";
import Approval from "../atoms/icon/Approval";

interface IconWithTextnProps {
  title: string;
}

export default function IconWithTextThree({ title }: IconWithTextnProps) {
  return (
    <div className={styles["iconWithText-container"]}>
      <Approval />
      <div className={styles["iconWithText-container-text"]}>{title}</div>
    </div>
  );
}
