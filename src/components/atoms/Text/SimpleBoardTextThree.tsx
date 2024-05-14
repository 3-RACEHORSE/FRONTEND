import React, { ReactNode } from "react";
import styles from "@/styles/main/main.module.scss";

interface TextProps {
  minPrice?: string;
}

export default function SimpleBoardTextThree({ minPrice }: TextProps) {
  return <p className={styles["boardMinPrice"]}>✅최소 {minPrice}</p>;
}
