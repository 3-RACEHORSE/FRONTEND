"use client";

import React, { ChangeEvent, ReactNode } from "react";
import styles from "@/styles/atoms/authText.module.scss";

interface TextProps {
  value: string;
}

export default function AuthText({ value }: TextProps) {
  return <div className={styles["text"]}>{value}</div>;
}
