"use client";

import React, { useState, useEffect } from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/chat.module.scss";
import { sessionValid } from "@/utils/session/sessionValid";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useParams } from "next/navigation";
import BackHeader from "../layout/BackHeader";
import { convertUToKST } from "@/utils/common/convertUToKST";
interface ChatType {
  content: any;
  createdAt: any;
  handle: any;
  profileImage: any;
}

interface Props {
  params: {
    id: string;
  };
}

export default function ChatRoom() {
  const roomNumber = useParams();
  const [chatData, setChatData] = useState<ChatType[]>([]);
  const [newMessage, setNewMessage] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await sessionValid();
      if (result) {
        const eventSource = new EventSourcePolyfill(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber.id}`,
          {
            withCredentials: true,

            headers: {
              Authorization: `Bearer ${result.authorization}`,
              uuid: `${result.uuid}`,
            },
            heartbeatTimeout: 120000,
          }
        );
        eventSource.onmessage = (event) => {
          const newData: ChatType = JSON.parse(event.data);

          // Check if the new data is already in chatData
          setChatData((prevData) => {
            const isDuplicate = prevData.some(
              (chat) =>
                chat.content === newData.content &&
                chat.createdAt === newData.createdAt &&
                chat.handle === newData.handle
            );

            if (!isDuplicate) {
              return [...prevData, newData];
            } else {
              return prevData;
            }
          });
        };

        eventSource.onerror = (error) => {
          console.error("EventSource error:", error);
          eventSource.close();
        };

        return () => {
          eventSource.close();
        };
      }
    };

    fetchData();
  }, [roomNumber]);

  return (
    <main className={styles.main}>
      {chatData.map((chat, index) => {
        const isSameHandleAsPrevious =
          index > 0 && chatData[index - 1].handle === chat.handle;

        return (
          <div key={index}>
            {!isSameHandleAsPrevious && (
              <div className={styles.chatContainer}>
                <div className={styles.profileImageContainer}>
                  <img
                    src={chat.profileImage}
                    alt={`${chat.handle}'s profile`}
                    className={styles.profileImage}
                  />
                </div>
                <div className={styles.chatInfo}>
                  <p className={styles.handle}>{chat.handle}</p>
                  <p className={styles.createdAt}>
                    {convertUToKST(chat.createdAt)}
                  </p>
                </div>
              </div>
            )}
            <p className={styles.chatContent}>{chat.content}</p>
          </div>
        );
      })}
    </main>
  );
}
