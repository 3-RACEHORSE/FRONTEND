import { useCallback } from "react";
import { sessionValid } from "@/utils/session/sessionValid";

export const useFetchListData = (
  roomNumber: any,
  setChatData: React.Dispatch<React.SetStateAction<any[]>>
) => {
  return useCallback(
    async ({ pageParam = 0 }) => {
      const result = await sessionValid();
      if (result) {
        const enterTime = new Date().toISOString();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/previous/${roomNumber}?enterTime=${enterTime}&page=${pageParam}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.authorization}`,
              uuid: `${result.uuid}`,
            },
          }
        );

        const data = await res.json();
        const reversedData = data.previousChatWithMemberInfoDtos.reverse();

        setChatData((prevData) => [...reversedData, ...prevData]);

        return reversedData;
      }
    },
    [roomNumber, setChatData]
  );
};
