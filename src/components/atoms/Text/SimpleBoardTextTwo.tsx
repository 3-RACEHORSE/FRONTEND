import React, { ReactNode } from "react";
import styles from "@/styles/main/main.module.scss";

interface TextProps {
  content: string;
}

export default function SimpleBoardTextTwo({ content }: TextProps) {
  return (
    <p className={styles["boardContent"]}>
      {content.length > 11 ? content.substring(0, 11) + "..." : content}
    </p>
  );
}
