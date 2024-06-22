import DataFetcher from "@/components/organism/join/JoinInfoOne";
import BackHeader from "@/components/organism/layout/BackHeader";
import styles from "@/styles/organism/chat.module.scss";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import NavBar from "@/components/organism/layout/NavBar";
import Header from "@/components/organism/layout/Header";
import ChatHeader from "@/components/organism/layout/ChatHeader";
import ChatList from "@/components/organism/chat/ChatList";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getChatListData() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/chatRooms`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );

  if (res.status === 401 || res.status === 500) {
    // 이후 에러코드 401로 수정 필요
    console.log("토큰없");
    redirect("https://fe-meetplus.vercel.app/login");
  }
  if (!res.ok) {
    // throw new Error("Network Error");
    redirect("https://fe-meetplus.vercel.app/login");
  }

  const data = await res.json();
  return data;
}

async function getChatListLastMessage(roomNumber: any) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/last`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );
  if (!res.ok) {
    if (res.status == 404) {
      console.log("404");
    }
    return { content: "채팅이 시작되지 않았습니다.", createdAt: null };
  }

  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getChatListData();
  const roomNumbers = data.map((chat: { roomNumber: any }) => chat.roomNumber);

  const contentPromises = roomNumbers.map((roomNumber: any) =>
    getChatListLastMessage(roomNumber)
  );
  const content = await Promise.all(contentPromises);

  return (
    <main>
      <ChatHeader />
      <div className={styles["chatListLayout"]}>
        {data.map((chat: any, index: any) => (
          <Link href={`/chatRoom/${chat.roomNumber}`} key={index}>
            <ChatList
              key={index}
              thumbnail={chat.thumbnail}
              title={chat.title}
              updatedAt={content[index]?.createdAt}
              content={content[index]?.content}
            />
          </Link>
        ))}
      </div>
      <NavBar />
    </main>
  );
}
