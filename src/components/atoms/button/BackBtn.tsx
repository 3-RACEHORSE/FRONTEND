"use client";

import React, { ReactNode } from "react";
import styles from "@/styles/atoms/backBtn.module.scss";
import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
}

export default function BackBtn({ onClick }: ButtonProps) {
  return (
    <Image
      className={styles["button"]}
      onClick={onClick}
      src="/images/header/back.png"
      width={30}
      height={30}
      alt="few"
    />
  );
}
