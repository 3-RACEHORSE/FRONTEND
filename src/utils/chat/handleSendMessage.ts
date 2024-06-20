import { sessionValid } from "@/utils/session/sessionValid";

const sendMessage = async (newMessage: any, roomNumber: any) => {
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
            roomNumber: roomNumber,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
};

export default sendMessage;
