"use client";

import React, { ChangeEvent, CSSProperties } from "react";
import styles from "@/styles/atoms/joinInput.module.scss";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}

export default function JoinInput({ value, onChange, style }: InputProps) {
  return (
    <input
      className={styles["input"]}
      type="text"
      value={value}
      onChange={onChange}
      style={style}
    />
  );
}
