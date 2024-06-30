"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import styles from "@/styles/organism/chat.module.scss";
import { postSubmitChatData } from "@/apis/postSubmitChatData";
import useChatScroll from "@/hooks/chat/useChatScroll";
import useChatRoomSSE from "@/hooks/sse/useChatRoomSSE";
import { useFetchListData } from "@/apis/getChatRoomPrevData";
import { ChatObjectType } from "@/interface/ChatObjectType";
import { convertUToKST } from "@/utils/time/convertUToKST";

interface ChatProps {
  authorization: any;
  uuid: any;
}

const ChatRoom: React.FC<ChatProps> = ({ authorization, uuid }) => {
  const roomNumber = useParams().id;
  const [chatData, setChatData] = useState<ChatObjectType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const { ref, inView } = useInView();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  //스크롤 하단 이벤트
  const chatContainerRef = useChatScroll(chatData);

  //RQ 역 무한 스크롤
  const { fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["message", "chat"],
    queryFn: useFetchListData(roomNumber, setChatData),
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

  //채팅 SSE 연결
  useChatRoomSSE(authorization, uuid, roomNumber, setChatData);

  //스크롤 최하단 이돟
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  //메시지 입력 변화 감지
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  //메시지 보내기 - 키보드 이벤트
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  //메시지 보내기
  const handleSendMessage = async () => {
    await postSubmitChatData({ authorization, uuid, newMessage, roomNumber });
    setNewMessage("");
    scrollToBottom();
  };

  return (
    <>
      <main className={styles.main} ref={chatContainerRef}>
        {chatData.map((chat, index) => {
          const isUserMessage = chat.uuid === uuid;
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
          onKeyPress={handleKeyPress}
        />
        <div className={styles.sendBtn} onClick={handleSendMessage}>
          <img src="/icons/sendBtn.png" alt="Send" />
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
