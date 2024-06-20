"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { convertUToKST } from "@/utils/common/convertUToKST";
import styles from "@/styles/organism/chat.module.scss";
import sendMessage from "@/utils/chat/handleSendMessage";
import useScrollHandler from "@/hooks/chat/useScrollHandler";
import { sessionValid } from "@/utils/session/sessionValid";
import useChatEventSource from "@/hooks/chat/useChatEventSource";
import Logo from "@/asset/svgs/Logo";

const ChatRoom: React.FC = () => {
  const roomNumber = useParams();
  const { ref, inView } = useInView();
  const [newMessage, setNewMessage] = useState<string>("");
  const [temp, setTemp] = useState<boolean>(false);
  const { chatData, userUUID, setChatData } = useChatEventSource(roomNumber.id);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useScrollHandler(chatData);

  //RQ fetch 로직
  const fetchListData = useCallback(
    async ({ pageParam = 0 }) => {
      const result = await sessionValid();
      if (result) {
        const enterTime = new Date().toISOString();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/previous/${roomNumber.id}?enterTime=${enterTime}&page=${pageParam}`,
          {
            // cache: "no-store",
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

        setChatData((prevData: any) => [...reversedData, ...prevData]);
        if (pageParam === 0) {
          setTemp(!temp);
        }

        return reversedData;
      }
    },
    [roomNumber.id, setChatData]
  );

  //RQ 관리
  const { fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["message", "chat"],
    queryFn: fetchListData,
    initialPageParam: 0,
    staleTime: 1000 * 20 * 20, // 이거 나중에 0
    gcTime: 300 * 1000, // 이거 나중에 0, 그래야 다나옴 따로 연구
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

    scrollToBottom();
  }, [chatData]);

  //메시지 텍스트 추적
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  //메시지 보내기
  const handleSendMessage = async () => {
    await sendMessage(newMessage, roomNumber.id);
    setNewMessage("");
    setTemp(!temp);
  };

  return (
    <>
      <main className={styles.main} ref={chatContainerRef}>
        {chatData.map((chat: any, index: any) => {
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
        <div className={styles.sendBtn} onClick={handleSendMessage}>
          <img src="/icons/sendBtn.png" alt="Send" />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
