"use client";

import { useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

interface ChatListInfo {
  content: any;
  createdAt: any;
}

const useChatListSSE = (
  roomNumber: string | undefined,
  authorization: string | undefined,
  uuid: string | undefined,
  setChatInfo: React.Dispatch<React.SetStateAction<ChatListInfo>>,
  setChatNum: React.Dispatch<React.SetStateAction<number>>
) => {
  const eventSource = useRef<EventSource | null>(null);

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
        setChatInfo({
          content: data.content,
          createdAt: data.createdAt,
        });
        setChatNum((prev) => prev + 1);

        if (data.round === null) {
          eventSource.current?.close();
          // setTimeout(fetchSSE, 3000);
          fetchSSE();
          return;
        }
      };

      eventSource.current.onerror = async () => {
        eventSource.current?.close();
        setTimeout(fetchSSE, 3000);
      };

      eventSource.current.onopen = (event) => {
        console.log("연결 성공:", event);
      };
    };

    fetchSSE();

    return () => {
      eventSource.current?.close();
    };
  }, [authorization, roomNumber, uuid, setChatInfo, setChatNum]);
};

export default useChatListSSE;
