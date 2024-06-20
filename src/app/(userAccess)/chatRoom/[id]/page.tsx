import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import ChatRoom from "@/components/organism/chat/ChatRoom";
import BackHeader from "@/components/organism/layout/BackHeader";
import ChatSendBar from "@/components/organism/chat/ChatSendBar";

export default async function Page() {
  return (
    <main>
      <BackHeader
        thumbnail={"/dummy/iuprofile.jpg"}
        title={"방제목입니다방제목"}
        type={"chatroom"}
      />
      <ChatRoom />
      {/* <ChatSendBar /> */}
    </main>
  );
}
