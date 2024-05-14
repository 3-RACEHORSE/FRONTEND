"use client";

import React, { ChangeEvent } from "react";
import BoardTitleText from "../atoms/Text/BoardTitleText";
import ImageTag from "@/components/atoms/etc/ImageTag";

interface IconWithTextnProps {
  title: string;
  src?: string;
  detail?: string;
}

export default function IconWithTextOne({
  title,
  src,
  detail,
}: IconWithTextnProps) {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          paddingLeft: "3%",
          paddingRight: "3%",
          paddingTop: "3%",
          alignItems: "center",
          borderTop: "1px solid #e3e3e3",
          marginTop: "8px",
        }}
      >
        <BoardTitleText title={title} />
        <ImageTag src={src} />
      </div>
      <div
        style={{
          paddingLeft: "3%",
          color: "rgb(171, 171, 171)",
          fontSize: "12px",
        }}
      >
        {detail}
      </div>
    </>
  );
}
