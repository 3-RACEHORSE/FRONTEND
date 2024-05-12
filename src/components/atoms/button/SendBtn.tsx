"use client";

import React, { ReactNode } from "react";
import styles from "@/styles/atoms/sendBtn.module.scss";

interface ButtonProps {
  onClick: () => void;
  buttonText: string;
}

export default function SendBtn({ onClick, buttonText }: ButtonProps) {
  return (
    <button className={styles["button"]} onClick={onClick}>
      {buttonText}
    </button>
  );
}
