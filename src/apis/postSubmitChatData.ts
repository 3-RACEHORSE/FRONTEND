import { SendMessageParams } from "@/interface/SendMessageParams";

export const postSubmitChatData = async ({
  authorization,
  uuid,
  newMessage,
  roomNumber,
}: SendMessageParams): Promise<void> => {
  if (!newMessage.trim()) {
    return;
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          content: newMessage,
          roomNumber: roomNumber,
        }),
      }
    );

    console.log(res.status);
    if (!res.ok) {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
