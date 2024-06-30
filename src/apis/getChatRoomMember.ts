import { MemberInfo } from "@/interface/MemberInfo";

const getChatRoomMember = async (
  authorization: string,
  uuid: string,
  roomNumber: string
): Promise<MemberInfo[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/member`,
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching members: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return [];
  }
};

export default getChatRoomMember;
