import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/chat.module.scss";
import { truncateText } from "@/utils/common/truncateText";

interface ChatListProps {
  thumbnail?: any;
  title?: any;
  updatedAt?: any;
}

export default function ChatList({
  thumbnail,
  title,
  updatedAt,
}: ChatListProps) {
  return (
    <div
      style={{
        display: "flex",
        aspectRatio: "5 / 1",
        background: "red",
        padding: "3%",
        justifyContent: "space-between",
      }}
    >
      <img
        src={thumbnail}
        style={{
          aspectRatio: "1 / 1",
          background: "blue",
          borderRadius: "999px",
        }}
      />
      <div style={{ aspectRatio: "3.5 / 1", background: "blue" }}>
        <p>{truncateText(title, 13)}</p>
        <p>fdsaf</p>
      </div>
      <div style={{ aspectRatio: "2 / 1", background: "blue" }}>
        {updatedAt}
      </div>
    </div>
  );
}
