"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";

import BoardInfo from "@/components/molecules/BoardInfo";
import BackHeader from "../layout/BackHeader";
import { convertUToKST } from "@/utils/common/convertUToKST";
import { sessionValid } from "@/utils/session/sessionValid";
import styles from "@/styles/organism/chat.module.scss";

interface ChatType {
  content: string;
  createdAt: string;
  handle: string;
  profileImage: string;
  uuid: string;
}

const ChatRoom: React.FC = () => {
  const roomNumber = useParams();
  const [chatData, setChatData] = useState<ChatType[]>([]);
  const [userUUID, setUserUUID] = useState<any>("");
  const [newMessage, setNewMessage] = useState<string>("");
  const [temp, setTemp] = useState<boolean>(false);

  const { ref, inView } = useInView();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(0);
  const isAtBottom = useRef<boolean>(true);

  const fetchListData = useCallback(
    async ({ pageParam = 0 }) => {
      const result = await sessionValid();
      if (result) {
        const enterTime = new Date().toISOString();
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
        const reversedData = data.previousChatWithMemberInfoDtos.reverse();

        setChatData((prevData) => [...reversedData, ...prevData]);
        if (pageParam === 0) {
          setTemp(!temp);
        }

        return reversedData;
      }
    },
    [roomNumber.id]
  );

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["message", "chat"],
    queryFn: fetchListData,
    initialPageParam: 0,
    staleTime: 0,
    gcTime: 0,
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

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView();
    };

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
          setTemp(!temp);

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

    fetchData();
    scrollToBottom();
  }, [roomNumber.id, temp]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      if (isAtBottom.current) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      } else {
        chatContainer.scrollTop +=
          chatContainer.scrollHeight - prevScrollHeight.current;
      }
    }
  }, [chatData]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const handleScroll = () => {
        isAtBottom.current =
          chatContainer.scrollTop + chatContainer.clientHeight >=
          chatContainer.scrollHeight;
        prevScrollHeight.current = chatContainer.scrollHeight;
      };

      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

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
              roomNumber: roomNumber.id,
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

  return (
    <>
      <main className={styles.main} ref={chatContainerRef}>
        {chatData.map((chat, index) => {
          const isUserMessage = chat.uuid === userUUID;
          const isSameHandleAsPrevious =
            index > 0 && chatData[index - 1].handle === chat.handle;

          return (
            <div
              key={index}
              id={`message-${index}`}
              ref={index === 0 ? ref : null}
              className={
                isUserMessage
                  ? `${styles.chatLayout} ${styles.chatLayoutMy}`
                  : styles.chatLayout
              }
            >
              {!isUserMessage && !isSameHandleAsPrevious && (
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
              <div
                className={
                  isUserMessage ? styles.chatContentMy : styles.chatContent
                }
              >
                {chat.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </main>
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={newMessage}
          onChange={handleMessageChange}
        />
        <div className={styles.sendBtn} onClick={sendMessage}>
          <img src="/icons/sendBtn.png" alt="Send" />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
