import React, { ReactNode } from "react";
import styles from "@/styles/atoms/titleText.module.scss";

interface TextProps {
  title: ReactNode;
}

export default function TitleText({ title }: TextProps) {
  return <div className={styles["text"]}>{title}</div>;
}
