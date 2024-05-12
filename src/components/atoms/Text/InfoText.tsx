"use client";

import React, { ReactNode } from "react";
import styles from "@/styles/atoms/infoText.module.scss";

interface TextProps {
  title: ReactNode;
}

export default function InfoText({ title }: TextProps) {
  return <div className={styles["text"]}>{title}</div>;
}
