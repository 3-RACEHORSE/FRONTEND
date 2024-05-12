"use client";

import React, { ChangeEvent } from "react";
import styles from "@/styles/molecules/watchList.module.scss";
import WatchListBtn from "../atoms/button/WatchListBtn";
interface ToggleButtonGroupProps {
  buttons: { label: string; isActive: boolean }[];
  onClick: (index: number) => void;
}

export default function WatchList({
  buttons,
  onClick,
}: ToggleButtonGroupProps) {
  const fetchData = () => {
    console.log("d");
  };
  return (
    <div className={styles["list-container"]}>
      {buttons &&
        buttons.map((button, index) => (
          <WatchListBtn
            key={index}
            label={button.label}
            onClick={() => onClick(index)}
            isActive={button.isActive}
          />
        ))}
    </div>
  );
}
