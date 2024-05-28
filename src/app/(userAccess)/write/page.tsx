import BackHeader from "@/components/organism/layout/BackHeader";
import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/MypageProfile";
import WritePage from "@/components/organism/write/WritePage";
import { cookies } from "next/headers";

export default async function Page() {
  return (
    <main>
      <BackHeader title="게시글 작성" />
      <WritePage />
    </main>
  );
}
