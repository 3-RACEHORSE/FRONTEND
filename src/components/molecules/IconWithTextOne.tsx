import React, { ChangeEvent } from "react";
import TitleText from "../atoms/Text/TitleText";
import Approval from "../atoms/icon/Approval";
import styles from "@/styles/molecules/iconWithText.module.scss";

interface IconWithTextnProps {
  title: string;
}

export default function IconWithTextOne({ title }: IconWithTextnProps) {
  return (
    <div className={styles["iconWithText-container"]}>
      <Approval />
      <div className={styles["iconWithText-container-text"]}>{title}</div>
    </div>
  );
}
