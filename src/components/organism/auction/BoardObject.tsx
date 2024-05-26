import React, { useState, ChangeEvent } from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/boardObject.module.scss";
import Image from "next/image";

interface BoardProps {
  src?: string;
  title: string;
  detail?: string;
  category?: string;
  minPrice?: string;
  startDate?: string;
  endDate?: string;
}

export default function BoardObject({
  src,
  title,
  detail,
  category,
  minPrice,
  startDate,
  endDate,
}: BoardProps) {
  return (
    <div className={styles["boardObject-container"]}>
      <div className={styles["boardObject-element1"]}>
        <img
          src={src}
          alt={""}
          style={{
            border: "1px solid #e3e3e3",
            width: "100%",
            height: "100%",
            borderRadius: "5px",
          }}
        />
      </div>
      <BoardInfo
        title={title}
        detail={detail}
        category={category}
        minPrice={minPrice}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}