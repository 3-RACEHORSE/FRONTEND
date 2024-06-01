"use client";

import React, { ReactNode } from "react";
import styles from "@/styles/atoms/backBtn.module.scss";
import { IoMdArrowRoundBack } from "react-icons/io";

interface ButtonProps {
  onClick: () => void;
}

export default function BackBtn({ onClick }: ButtonProps) {
  return (
    // <Image
    //   className={styles["button"]}
    //   onClick={onClick}
    //   src="/images/header/back.png"
    //   width={30}
    //   height={30}
    //   alt="few"
    // />
    <IoMdArrowRoundBack
      onClick={onClick}
      style={{ width: "30px", height: "30px" }}
    />
  );
}
