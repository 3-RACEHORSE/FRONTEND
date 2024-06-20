"use client";

import React, { useState } from "react";
import styles from "@/styles/organism/chat.module.scss";
import { truncateText } from "@/utils/common/truncateText";
import { sessionValid } from "@/utils/session/sessionValid";
import { useParams } from "next/navigation";

export default function ChatSendBar() {
  const [newMessage, setNewMessage] = useState<any>("");
  const pathName = useParams();

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const sendMessage = async () => {
    const result = await sessionValid();

    if (result) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.authorization}`,
              uuid: `${result.uuid}`,
            },
            body: JSON.stringify({
              content: newMessage,
              roomNumber: pathName.id,
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Failed to send message");
        }

        setNewMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
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
        <img src="/icons/sendBtn.png" alt="Send" />
      </div>
    </div>
  );
}
