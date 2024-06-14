import DataFetcher from "@/components/organism/join/JoinInfoOne";
import BackHeader from "@/components/organism/layout/BackHeader";
import styles from "@/styles/join/join.module.scss";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import NavBar from "@/components/organism/layout/NavBar";
import Header from "@/components/organism/layout/Header";
import ChatHeader from "@/components/organism/layout/ChatHeader";
import ChatList from "@/components/organism/chat/ChatList";
import chatData from "@/constants/chatData";
import Link from "next/link";
// async function getChatListData() {
//   const authorization = cookies().get("authorization")?.value;
//   const uuid = cookies().get("uuid")?.value;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/chatRooms`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         authorization: `Bearer ${authorization}`,
//         uuid: `${uuid}`,
//       },
//     }
//   );
//   // if (!res.ok) {
//   //   throw new Error("검색결과 에러");
//   // }
//   const data = await res.json();
//   return data;
// }

export default async function Page() {
  // const data = await getChatListData();
  // console.log(data[0].roomNumber); // 임시로 첫번째 배열 적용
  return (
    <main>
      <ChatHeader />
      {/* <Link
        href={`/chatRoom/${data[0].roomNumber}`}
        style={{ background: "red" }}
      >
        채팅방
      </Link>
      <Link
        href={`/chatRoom/${data[1].roomNumber}`}
        style={{ background: "blue" }}
      >
        채팅방
      </Link>
      <Link
        href={`/chatRoom/${data[2].roomNumber}`}
        style={{ background: "blue" }}
      >
        채팅방
      </Link> */}
      {chatData.map((chat, index) => (
        <Link href={"/chatRoom/1"} key={index}>
          <ChatList
            key={index}
            thumbnail={chat.thumbnail}
            title={chat.title}
            updatedAt={chat.updatedAt}
          />
        </Link>
      ))}

      <NavBar />
    </main>
  );
}
