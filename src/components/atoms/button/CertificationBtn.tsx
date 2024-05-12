"use client";

import React, { ReactNode } from "react";
import styles from "@/styles/atoms/certification.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export default function Certification({ onClick, children }: ButtonProps) {
  return (
    <button className={styles["button"]} onClick={onClick}>
      {children}
    </button>
  );
}
