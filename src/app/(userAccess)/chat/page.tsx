import styles from "@/styles/organism/chat.module.scss";
import { cookies } from "next/headers";
import NavBar from "@/components/organism/layout/NavBar";
import ChatHeader from "@/components/organism/layout/ChatHeader";
import ChatList from "@/components/organism/chat/ChatList";
import Link from "next/link";
import { getChatListData } from "@/apis/getChatListData";

export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getChatListData(authorization, uuid);

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
              authorization={authorization}
              uuid={uuid}
              roomNumber={chat.roomNumber}
            />
          </Link>
        ))}
      </div>
      <NavBar />
    </main>
  );
}
