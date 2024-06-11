import { auth } from "@/auth";
import { cookies } from "next/headers";
import Scroll from "@/app/(commonAccess)/auction/[id]/_component/Scroll";
import Header from "@/components/organism/layout/Header";
import WriteBar from "@/components/organism/layout/WriteBar";
import NavBar from "@/components/organism/layout/NavBar";
import AuctionHeader from "@/components/organism/layout/AuctionHeader";
import BoardObject from "@/components/organism/auction/BoardObject";
import Link from "next/link";
export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const session = await auth();
  let isSession;

  if (session) {
    isSession = true;
  } else {
    isSession = false;
  }

  return (
    <main>
      <AuctionHeader />
      {/* <Scroll authorization={authorization} uuid={uuid} isSession={isSession} /> */}
      {/* 더미데이터 적용, 임시 링크*/}
      <Link href="/detail/1">
        <BoardObject
          src="/dummy/profile.jpg" // 바꿀것 {object.thumbnail}
          status="진행중" // 로직상 처리
          title="광안리 바다 보며 아이유와 펩시 마시기!"
          detail="시니어 경력 17년차 프론트엔드 개발자..." // 버릴거
          category="세무·법무·노무" // 버릴거
          startPrice="9,999" // 바꿀것 {object.thumbnail}
          auctionStartDate="9999.99.99" // 바꿀것 {object.auctionStartTime}
          eventStartDate="9999.99.99" // 바꿀것 {object.eventStartTime}
          place="서울특별시 강남구 테헤란로 역삼역" // 바꿀것 {object.eventPlace}
        />
      </Link>
      {/* <WriteBar /> */}
      <NavBar />
    </main>
  );
}
