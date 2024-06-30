import React, { ReactNode } from "react";
import styles from "@/styles/main/main.module.scss";
import { truncateText } from "@/utils/text/truncateText";

interface TextProps {
  title: string;
}

export default function SimpleBoardTextOne({ title }: TextProps) {
  return <p className={styles["boardTitle"]}>{truncateText(title, 11)}</p>;
}
