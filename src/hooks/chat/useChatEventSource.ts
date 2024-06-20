import { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { sessionValid } from "@/utils/session/sessionValid";

interface ChatType {
  content: string;
  createdAt: string;
  handle: string;
  profileImage: string;
  uuid: string;
}

const useChatEventSource = (roomId: any) => {
  const [chatData, setChatData] = useState<ChatType[]>([]);
  const [userUUID, setUserUUID] = useState<any>("");

  useEffect(() => {
    const setupEventSource = async () => {
      const result = await sessionValid();
      if (result) {
        setUserUUID(result.uuid);

        const eventSource = new EventSourcePolyfill(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${result.authorization}`,
              uuid: `${result.uuid}`,
            },
            heartbeatTimeout: 86400000, // 24 hours
          }
        );

        eventSource.onmessage = (event) => {
          const newData: ChatType = JSON.parse(event.data);
          setChatData((prevData) => {
            if (
              !prevData.some(
                (chat) =>
                  chat.content === newData.content &&
                  chat.createdAt === newData.createdAt &&
                  chat.handle === newData.handle
              )
            ) {
              return [...prevData, newData];
            }
            return prevData;
          });
        };

        eventSource.onerror = (error) => {
          console.error("EventSource error:", error);
          eventSource.close();
        };

        return () => eventSource.close();
      }
    };

    setupEventSource();
  }, [roomId]);

  return { chatData, userUUID, setChatData };
};

export default useChatEventSource;
