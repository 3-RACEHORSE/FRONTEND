import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import ChatRoom from "@/components/organism/chat/ChatRoom";
import BackHeader from "@/components/organism/layout/BackHeader";
import ChatSendBar from "@/components/organism/chat/ChatSendBar";
import { cookies } from "next/headers";

async function getUserPofileData(roomNumber: any) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  console.log(authorization, uuid);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/title`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`, // Add Bearer if needed
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

export default async function Page(props: any) {
  const roomNumber = props.params.id;

  const data = await getUserPofileData(roomNumber);
  console.log(data);

  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
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
      {/* <ChatSendBar /> */}
    </main>
  );
}
