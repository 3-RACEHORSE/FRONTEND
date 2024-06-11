import { auth } from "@/auth";
import { cookies } from "next/headers";
import Scroll from "@/app/(commonAccess)/auction/[id]/_component/Scroll";
import Header from "@/components/organism/layout/Header";
import WriteBar from "@/components/organism/layout/WriteBar";
import NavBar from "@/components/organism/layout/NavBar";
import AuctionHeader from "@/components/organism/layout/AuctionHeader";
import BoardObject from "@/components/organism/auction/BoardObject";
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
      {/* 더미데이터 적용 */}
      <BoardObject
        src="/dummy/profile.jpg"
        status="진행중"
        title="광안리 바다 보며 아이유와 펩시 마시기!"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />

      {/* <WriteBar /> */}
      <NavBar />
    </main>
  );
}
