import React, { ReactNode } from "react";
import styles from "@/styles/main/main.module.scss";
import { truncateText } from "@/utils/text/truncateText";

interface TextProps {
  content: string;
}

export default function SimpleBoardTextTwo({ content }: TextProps) {
  return <p className={styles["boardContent"]}>{truncateText(content, 11)}</p>;
}
