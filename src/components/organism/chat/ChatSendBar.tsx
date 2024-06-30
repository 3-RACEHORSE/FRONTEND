"use client";

import React, { useState } from "react";
import styles from "@/styles/organism/chat.module.scss";
import { useParams } from "next/navigation";
import { postSendMessage } from "@/apis/postSendMessage";

export default function ChatSendBar() {
  const [newMessage, setNewMessage] = useState<any>("");
  const pathName = useParams();

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (await postSendMessage(newMessage, pathName.id)) {
      setNewMessage("");
    }
  };

  return (
    <div className={styles.chatInput}>
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={newMessage}
        onChange={handleMessageChange}
      />
      <div className={styles["sendBtn"]} onClick={sendMessage}>
        <img src="/icons/sendBtn.png" alt="Send" />
      </div>
    </div>
  );
}
