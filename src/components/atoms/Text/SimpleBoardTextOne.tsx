import React, { ReactNode } from "react";
import styles from "@/styles/main/main.module.scss";

interface TextProps {
  title?: string;
}

export default function SimpleBoardTextOne({ title }: TextProps) {
  return <p className={styles["boardTitle"]}>{title}</p>;
}
