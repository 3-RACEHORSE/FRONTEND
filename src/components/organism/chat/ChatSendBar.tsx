"use client";

import React, { useState } from "react";
import styles from "@/styles/organism/chat.module.scss";
import { truncateText } from "@/utils/common/truncateText";

interface ChatListProps {}

export default function ChatSendBar({}: ChatListProps) {
  const [newMessage, setNewMessage] = useState<any>("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = async () => {
    console.log("전송");
  };

  console.log(newMessage);

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={newMessage}
        onChange={handleMessageChange}
      />
      <div className={styles["sendBtn"]} onClick={sendMessage}>
        <img src={"/icons/logoBtn.png"} />
      </div>
    </div>
  );
}
