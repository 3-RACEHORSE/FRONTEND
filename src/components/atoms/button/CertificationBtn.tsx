"use client";

import React, { ReactNode } from "react";
import styles from "@/styles/atoms/certificationBtn.module.scss";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
}

export default function CertificationBtn({ onClick, children }: ButtonProps) {
  return (
    <button className={styles["button"]} onClick={onClick}>
      {children}
    </button>
  );
}
