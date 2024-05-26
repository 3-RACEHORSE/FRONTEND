import BoardObject from "@/components/organism/auction/BoardObject";
import Footer from "@/components/organism/layout/Footer";
import NavBar from "@/components/organism/layout/NavBar";
import TextHeader from "@/components/organism/layout/TextHeader";
import MypageProfile from "@/components/organism/mypage/mypageProfile";
import SubScribeInfo from "@/components/organism/subscribe/SubscribeInfo.tsx";

import SubscribeObject from "@/components/organism/subscribe/SubscribeObject";

export default function Page() {
  return (
    <main>
      <TextHeader title="마이페이지" />
      <MypageProfile
        src="/dummy/profile.jpg"
        name="CHO"
        follower="99"
        following="99"
        categories={[
          "디자인",
          "IT·프로그래밍",
          "세무·법무·노무",
          "취업·입시",
          "취미·레슨",
        ]}
      />
      <Footer />
      <NavBar />
    </main>
  );
}
