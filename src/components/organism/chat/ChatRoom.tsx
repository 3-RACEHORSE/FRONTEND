"use client";

import React, { useState, useEffect, useRef } from "react";
import BoardInfo from "@/components/molecules/BoardInfo";
import styles from "@/styles/organism/chat.module.scss";
import { sessionValid } from "@/utils/session/sessionValid";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useParams } from "next/navigation";
import BackHeader from "../layout/BackHeader";
import { convertUToKST } from "@/utils/common/convertUToKST";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

interface ChatType {
  content: any;
  createdAt: any;
  handle: any;
  profileImage: any;
  uuid: any;
}

export default function ChatRoom() {
  const roomNumber = useParams();
  const [chatData, setChatData] = useState<ChatType[]>([]);
  const [userUUID, setUserUUID] = useState<any>("");
  const { ref, inView } = useInView();
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for the last message
  const [firstMessageIndex, setFirstMessageIndex] = useState(0); // State to track the index of the first message
  const [temp, setTemp] = useState(false); // State to track the index of the first message

  //채팅
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
        setTemp(!temp);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const fetchListData = async ({ pageParam }: { pageParam: number }) => {
    console.log("훅보다 시작됨");
    const enterTime = new Date().toISOString();
    const result = await sessionValid();
    if (result) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/previous/${roomNumber.id}?enterTime=${enterTime}&page=${pageParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.authorization}`,
            uuid: `${result.uuid}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      const reversedData = data.previousChatWithMemberInfoDtos.reverse();
      setChatData((prevData) => [...reversedData, ...prevData]);

      setFirstMessageIndex(reversedData.length); // Set the new index
      scrollToFirstMessage(); // Scroll to the first message
      if (data.currentPage == 1) {
        setTemp(!temp);
      }
      // if (data.currentPage === 1) {
      //   console.log("일번 이제 시작");
      //   alert("왜 안돼지?");
      // }

      return reversedData;
    }
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["message", "chat"],
    queryFn: fetchListData,
    initialPageParam: 0,
    staleTime: 1000 * 20 * 20,
    gcTime: 300 * 1000,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // useEffect for scrolling to the bottom
  useEffect(() => {
    console.log("훅이 시작");
    scrollToBottom();
  }, [temp]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  const scrollToFirstMessage = () => {
    if (firstMessageIndex !== 0 && chatData[firstMessageIndex - 1]) {
      const firstMessageElement = document.getElementById(
        `message-${firstMessageIndex - 1}`
      );
      if (firstMessageElement) {
        firstMessageElement.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await sessionValid();
      if (result) {
        setUserUUID(result.uuid);

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

          setChatData((prevData) => {
            console.log("받음");
            setTemp(!temp);

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
    <>
      <main className={styles.main}>
        {chatData.map((chat, index) => {
          const isSameHandleAsPrevious =
            index > 0 && chatData[index - 1].handle === chat.handle;
          const isUserMessage = chat.uuid === userUUID;

          return (
            <div
              key={index}
              id={`message-${index}`}
              ref={index === 0 ? ref : null} // Apply ref to the first message
              className={
                isUserMessage
                  ? `${styles.chatLayout} ${styles.chatLayoutMy}`
                  : styles.chatLayout
              }
            >
              {!isSameHandleAsPrevious && chat.uuid !== userUUID && (
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
              {chat.uuid !== userUUID && (
                <p className={styles.chatContent}>{chat.content}</p>
              )}
              {chat.uuid === userUUID && (
                <div className={styles.chatContentMy}>
                  <div>{chat.content}</div>
                </div>
              )}
            </div>
          );
        })}
        {/* Empty div to serve as the scroll target */}
        <div ref={messagesEndRef} />
      </main>
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={handleMessageChange}
        />
        <div className={styles["sendBtn"]} onClick={sendMessage}>
          <img src={"/icons/logoBtn.png"} />
        </div>
      </div>
    </>
  );
}
