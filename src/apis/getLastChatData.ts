interface ChatListInfo {
  content: any;
  createdAt: any;
}

export const getLastChatData = async (
  authorization: string,
  uuid: string,
  roomNumber: string,
  setChatInfo: React.Dispatch<React.SetStateAction<ChatListInfo>>
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/last`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      }
    );
    const data = await response.json();
    setChatInfo({
      content: data.content,
      createdAt: data.createdAt,
    });
    return data;
  } catch (error) {
    console.error("Error fetching last chat data:", error);
  }
};
