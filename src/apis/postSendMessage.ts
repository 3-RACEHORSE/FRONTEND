"use server";

import { cookies } from "next/headers";

export const postSendMessage = async (newMessage: any, roomNumber: any) => {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
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

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    if (res.ok) {
      return true;
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
