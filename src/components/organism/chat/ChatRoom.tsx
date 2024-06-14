"use client";

import React, { useState, useEffect } from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/boardObject.module.scss";
import { sessionValid } from "@/utils/session/sessionValid";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useParams } from "next/navigation";
import BackHeader from "../layout/BackHeader";
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
  // const roomNumber = useParams();
  // const [chatData, setChatData] = useState<ChatType[]>([]);
  // const [newMessage, setNewMessage] = useState<any>("");

  // useEffect(() => {
  //   const fetchSessionAndConnect = async () => {
  //     const result = await sessionValid();

  //     if (result) {
  //       const connectToSSE = () => {
  //         const eventSource = new EventSourcePolyfill(
  //           `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${result.authorization}`,
  //               uuid: `${result.uuid}`,
  //             },
  //             heartbeatTimeout: 99990000,
  //           }
  //         );

  //         eventSource.onmessage = (event) => {
  //           const newData = JSON.parse(event.data);
  //           setChatData((prevData) => [...prevData, newData]);
  //           console.log(newData);
  //         };

  //         eventSource.onerror = (error) => {
  //           console.error("EventSource error:", error);
  //           eventSource.close();
  //           setTimeout(() => {
  //             connectToSSE();
  //           }, 5000);
  //         };

  //         return () => {
  //           eventSource.close();
  //         };
  //       };

  //       connectToSSE();
  //     }
  //   };

  //   fetchSessionAndConnect();
  // }, [roomNumber]);

  // const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewMessage(event.target.value);
  // };

  // const sendMessage = async () => {
  //   const result = await sessionValid();

  //   if (result) {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${result.authorization}`,
  //             uuid: `${result.uuid}`,
  //           },
  //           body: JSON.stringify({
  //             content: newMessage,
  //             roomNumber: roomNumber,
  //           }),
  //         }
  //       );

  //       if (!res.ok) {
  //         throw new Error("Failed to send message");
  //       }

  //       setNewMessage("");
  //     } catch (error) {
  //       console.error("Error sending message:", error);
  //     }
  //   }
  // };

  return (
    <main>
      {/* {chatData.map((chat, index) => (
        <div key={index}>
          <p>{chat.handle}</p>
          <p>{chat.content}</p>
          <p>{chat.createdAt}</p>
          <img src={chat.profileImage} alt={`${chat.handle}'s profile`} />
        </div>
      ))}

      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={handleMessageChange}
        />
        <button onClick={sendMessage}>전송</button>
      </div> */}

      {/* <ChatSendBar/> */}
    </main>
  );
}
