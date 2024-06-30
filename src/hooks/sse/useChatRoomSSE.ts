import { useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

interface ChatType {
  content: string;
  createdAt: string;
  handle: string;
  profileImage: string;
  uuid: string;
}

const useChatRoomSSE = (
  authorization: string,
  uuid: string,
  roomNumber: any,
  setChatData: React.Dispatch<React.SetStateAction<ChatType[]>>
) => {
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
        const newData: ChatType = JSON.parse(event.data);
        console.log("새로 받은 데이터", newData);
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
      eventSource.current.onerror = async () => {
        console.log("에러");
        eventSource.current?.close();
        fetchSSE();
      };
      eventSource.current.onopen = (event) => {
        console.log("onopen");
        console.log("채팅방 연결 성공:", event);
      };
    };
    fetchSSE();
    console.log("안녕");
    return () => {
      eventSource.current?.close();
    };
  }, [authorization, uuid, roomNumber, setChatData]);

  return eventSource;
};

export default useChatRoomSSE;
