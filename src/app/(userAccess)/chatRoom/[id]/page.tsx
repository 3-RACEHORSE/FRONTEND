import { getUserChatRoomData } from "@/apis/getUserChatRoomData";
import ChatRoom from "@/components/organism/chat/ChatRoom";
import BackHeader from "@/components/organism/layout/BackHeader";
import { cookies } from "next/headers";

export default async function Page(props: any) {
  const roomNumber = props.params.id;
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  const data = await getUserChatRoomData(roomNumber, authorization, uuid);

  return (
    <main>
      <BackHeader
        thumbnail={"/dummy/iuprofile.jpg"}
        title={data.title}
        type={"chatroom"}
        authorization={authorization}
        uuid={uuid}
      />
      <ChatRoom authorization={authorization} uuid={uuid} />
    </main>
  );
}
