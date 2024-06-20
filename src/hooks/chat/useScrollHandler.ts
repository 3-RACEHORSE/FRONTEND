import { useEffect, useRef } from "react";
interface ChatType {
  content: string;
  createdAt: string;
  handle: string;
  profileImage: string;
  uuid: string;
}

const useScrollHandler = (chatData: ChatType[]) => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(0);
  const isAtBottom = useRef<boolean>(true);

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

  return chatContainerRef;
};

export default useScrollHandler;
