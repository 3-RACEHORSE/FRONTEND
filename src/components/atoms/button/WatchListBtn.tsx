"use client";

import React, { ReactNode } from "react";
import styles from "@/styles/atoms/watchListBtn.module.scss";

interface ToggleButtonProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export default function WatchListBtn({
  label,
  onClick,
  isActive,
}: ToggleButtonProps) {
  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: isActive ? "#52ebb6" : "#ffffff" }}
      className={styles["button"]}
    >
      {label}
    </div>
  );
}
