export async function getUserChatRoomData(
  roomNumber: any,
  authorization: any,
  uuid: any
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/title`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();
  return data;
}
