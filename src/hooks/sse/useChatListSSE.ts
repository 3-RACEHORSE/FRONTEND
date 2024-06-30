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

    return () => {
      eventSource.current?.close();
    };
  }, [authorization, roomNumber, uuid, setChatInfo, setChatNum]);
};

export default useChatListSSE;
