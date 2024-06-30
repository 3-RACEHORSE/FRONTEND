export const getInitialData = async (
  authorization: string,
  uuid: string,
  roomNumber: string,
  setChatNum: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/unread`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      }
    );
    const data = await response.json();
    setChatNum(data.count);
  } catch (error) {
    console.error("Error fetching initial data:", error);
  }
};
