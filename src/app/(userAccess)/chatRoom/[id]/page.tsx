import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import ChatRoom from "./ChatRoom";

export default async function Page() {
  return (
    <main>
      <ChatRoom />
    </main>
  );
}
