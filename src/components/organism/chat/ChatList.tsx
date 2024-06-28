"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/organism/chat.module.scss";
import { truncateText } from "@/utils/common/truncateText";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

interface ChatListProps {
  thumbnail?: any;
  title?: any;
  authorization?: any;
  uuid?: any;
  roomNumber?: any;
}

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

  const calculateRelativeTime = (utcTime: string) => {
    const now = new Date();
    const utcDate = new Date(utcTime);
    const diffMilliseconds = now.getTime() - utcDate.getTime();
    console.log(now.getTime(), utcDate.getTime());
    const diffSeconds = Math.abs(diffMilliseconds) / 1000;
    const resultTime = diffSeconds - 32400;
    const days = Math.floor(resultTime / 86400);
    const hours = Math.floor(resultTime / 3600) % 24;
    const minutes = Math.floor(resultTime / 60) % 60;

    if (days > 0) {
      if (days === 1) {
        return `1일전`;
      } else {
        return `${days}일전`;
      }
    } else if (hours > 0) {
      return `${hours}시간전`;
    } else {
      if (minutes === 0) {
        return "지금";
      }
      return `${minutes} 분전`;
    }
  };

  const eventSource = useRef<null | EventSource>(null);

  useEffect(() => {
    const fetchSSE = () => {
      eventSource.current = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
        }
      );

      eventSource.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        setChatInfo({
          content: data.content,
          createdAt: data.createdAt,
        });
        console.log("데이터");
        setChatNum((prev) => prev + 1);

        if (data.round === null) {
          console.log("데이터가 null입니다. 재연결 시도 중...");
          eventSource.current?.close();
          // setTimeout(fetchSSE, 3000);
          fetchSSE();
          console.log("연결됨");
          return;
        }
      };

      eventSource.current.onerror = async () => {
        console.log("에러");
        eventSource.current?.close();
        setTimeout(fetchSSE, 3000);
      };
      eventSource.current.onopen = (event) => {
        console.log("onopen");
        console.log("연결 성공:", event);
      };
    };

    fetchSSE();
    console.log("안녕");
    return () => {
      eventSource.current?.close();
    };
  }, [authorization]);

  const fetchInitialData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/unread`,
        {
          headers: {
            Authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
        }
      );
      const data = await response.json();
      setChatNum(data.count);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const fetchLastChatData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/last`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
        }
      );
      const data = await response.json();
      setChatInfo({
        content: data.content,
        createdAt: data.createdAt,
      });
      console.log(data, "@@@@@@@@@@");
      return data;
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
    fetchLastChatData();
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
