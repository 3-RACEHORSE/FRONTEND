"use client";

import React, { useState, ChangeEvent } from "react";
import styles from "@/styles/organism/boardDetail.module.scss";
import BoardDetailInfoWithText from "@/components/molecules/BoardDetailInfoWithText";

interface BoardDetailProps {
  title: string;
  detail?: string;
  detailDate?: string;
  deadLine?: string;
  category?: string;
  price?: string;
  boardTitle?: string;
  boardContent?: string;
}

export default function BoardDetail({
  title,
  detail,
  detailDate,
  deadLine,
  category,
  price,
  boardTitle,
  boardContent,
}: BoardDetailProps) {
  return (
    <>
      <div className={styles["boardDetail-container"]}>
        <img
          src="/dummy/profile.jpg"
          alt={""}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <BoardDetailInfoWithText
        title={title}
        detail={detail}
        detailDate={detailDate}
        deadLine={deadLine}
        category={category}
        price={price}
        boardTitle={boardTitle}
        boardContent={boardContent}
      />
    </>
  );
}
