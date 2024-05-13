import React, { ReactNode } from "react";
import styles from "@/styles/atoms/boardTitleText.module.scss";

interface TextProps {
  title: ReactNode;
}

export default function BoardTitleText({ title }: TextProps) {
  return <div className={styles["text"]}>{title}</div>;
}
