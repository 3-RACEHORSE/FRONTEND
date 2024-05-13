import React, { ChangeEvent } from "react";
import TitleText from "../atoms/Text/TitleText";
import BusinessCard from "../atoms/icon/Approval";
import styles from "@/styles/molecules/iconWithText.module.scss";
import CheckMark from "../atoms/icon/CheckMark";

interface IconWithTextnProps {
  title: string;
}

export default function IconWithTextTwo({ title }: IconWithTextnProps) {
  return (
    <div className={styles["iconWithText-container"]}>
      <CheckMark />
      <div className={styles["iconWithText-container-text"]}>{title}</div>
    </div>
  );
}
