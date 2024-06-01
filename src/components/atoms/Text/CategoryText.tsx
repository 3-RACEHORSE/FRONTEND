import React, { ReactNode } from "react";
import styles from "@/styles/layout/header.module.scss";
interface TextProps {
  title: string;
}

export default function CategoryText({ title }: TextProps) {
  return <li className={styles["slider"]}>{title}</li>;
}
