"use client";

import React, { ChangeEvent } from "react";
import styles from "@/styles/atoms/joinInput.module.scss";

interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function JoinInput({ value, onChange }: InputProps) {
  return (
    <input
      className={styles["input"]}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
}
