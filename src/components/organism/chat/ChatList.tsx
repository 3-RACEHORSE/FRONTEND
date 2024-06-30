"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/organism/chat.module.scss";
import { calculateRelativeTime } from "@/utils/time/calculateRelativeTime";
import { ChatListProps } from "@/interface/ChatListProps";
import { getLastChatData } from "@/apis/getLastChatData";
import { getInitialData } from "@/apis/getInitialData";
import useChatListSSE from "@/hooks/sse/useChatListSSE";
import { truncateText } from "@/utils/text/truncateText";

interface ChatListInfo {
  content: any;
  createdAt: any;
}

export default function ChatList({
  thumbnail,
  title,
  authorization,
  uuid,
  roomNumber,
}: ChatListProps) {
  const [chatInfo, setChatInfo] = useState<ChatListInfo>({
    content: "",
    createdAt: "",
  });
  const [chatNum, setChatNum] = useState(0);

  useChatListSSE(roomNumber, authorization, uuid, setChatInfo, setChatNum);

  useEffect(() => {
    getInitialData(authorization, uuid, roomNumber, setChatNum);
    getLastChatData(authorization, uuid, roomNumber, setChatInfo);
  }, []);

  return (
    <div className={styles["chatListContainer"]}>
      <div style={{ display: "flex", width: "80%" }}>
        <div className={styles["thumbnail"]}>
          <img src={thumbnail} />
        </div>
        <div className={styles["textContainer"]}>
          <p className={styles["title"]}>{truncateText(title, 13)}</p>
          <p className={styles["subtitle"]}>{chatInfo.content}</p>
        </div>
      </div>
      <div className={styles["updatedAt"]}>
        {calculateRelativeTime(chatInfo.createdAt)}
        {chatNum > 0 && <p className={styles["count"]}>{chatNum}</p>}
      </div>
    </div>
  );
}
