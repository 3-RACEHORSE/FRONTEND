import Image from "next/image";

import BoardDetail from "@/components/organism/boardDetail/BoardDetail";
import BoardDetailBar from "@/components/organism/layout/BoardDetailBar";
import BoardDetailInfo from "@/components/organism/boardDetail/BoardDetailInfo";
import Footer from "@/components/organism/layout/Footer";
import ProfileInfo from "@/components/organism/profile/ProfileInfo";
import ProfileDetail from "@/components/organism/profile/ProfileDetail";
import SimpleBoardObject from "@/components/organism/main/SimpleBoardObject";

export default function Page() {
  return (
    <main>
      <ProfileInfo name="CHO YC" src="/dummy/profile.jpg" />
      <ProfileDetail />
      <div className="flex flex-col justify-center w-full h-200">
        <ul className="flex overflow-x-auto">
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
        </ul>
      </div>
      <Footer />
    </main>
  );
}
