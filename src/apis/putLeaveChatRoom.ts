const putLeaveChatRoom = async (
  authorization: string,
  uuid: string,
  roomNumber: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/leaveChatRoom`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
        },
        body: JSON.stringify({
          roomNumber: roomNumber,
          uuid: uuid,
        }),
      }
    );

    if (response.ok) {
      return true;
    } else {
      console.error("Failed to leave chat room:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error leaving chat room:", error);
    return false;
  }
};

export default putLeaveChatRoom;
