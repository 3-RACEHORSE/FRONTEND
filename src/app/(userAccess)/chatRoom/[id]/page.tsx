"use client";

import React, { useState, useEffect } from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/boardObject.module.scss";
import { sessionValid } from "@/utils/session/sessionValid";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

interface ChatType {
  content: string;
  createdAt: string;
  handle: string;
  profileImage: string;
}

interface Props {
  params: {
    id: string; // Assuming id is a string, adjust type if necessary
  };
}

const Page: React.FC<Props> = (props) => {
  const roomNumber = props.params.id;
  const [chatData, setChatData] = useState<ChatType[]>([]);

  useEffect(() => {
    const fetchSessionAndConnect = async () => {
      const result = await sessionValid();

      if (result) {
        const connectToSSE = () => {
          const eventSource = new EventSourcePolyfill(
            `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}`,
            {
              headers: {
                Authorization: `Bearer ${result.authorization}`,
                uuid: `${result.uuid}`,
              },
              heartbeatTimeout: 120000,
            }
          );

          eventSource.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            setChatData((prevData) => [...prevData, newData]); // Append new data to previous data
            console.log(newData);
          };

          eventSource.onerror = (error) => {
            console.error("EventSource error:", error);
            eventSource.close();
            setTimeout(() => {
              connectToSSE();
            }, 5000);
          };

          return () => {
            eventSource.close();
          };
        };

        connectToSSE();
      }
    };

    fetchSessionAndConnect();
  }, [roomNumber]);

  // Example conditional rendering while waiting for chatData
  if (chatData.length === 0) {
    return <>데이터를 불러오는 중...</>;
  }

  console.log(roomNumber);

  // Render chatData however you intend to display it
  return (
    <div>
      {chatData.map((chat, index) => (
        <div key={index}>
          <p>{chat.handle}</p>
          <p>{chat.content}</p>
          <p>{chat.createdAt}</p>
          <img src={chat.profileImage} alt={`${chat.handle}'s profile`} />
        </div>
      ))}
    </div>
  );
};

export default Page;
