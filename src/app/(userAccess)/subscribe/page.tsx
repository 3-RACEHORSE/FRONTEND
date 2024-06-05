import BoardObject from "@/components/organism/auction/BoardObject";
import SubScribeInfo from "@/components/organism/subscribe/SubscribeInfo.tsx";

import SubscribeObject from "@/components/organism/subscribe/SubscribeObject";
import HorizontalPage from "@/app/(userAccess)/subscribe/_component/HorizontalPage";

export default function Page() {
  return (
    <main>
      <SubScribeInfo title="✅구독" />
      {/* <div className="flex flex-col justify-center w-full h-200">
        <div className="flex overflow-x-auto">
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
          <SubscribeObject src="/dummy/profile.jpg" name="CHO" />
        </div>
      </div> */}
      <HorizontalPage />

      {/* <SubScribeInfo title="✅북마크" /> */}

      <BoardObject
        src="/dummy/profile.jpg"
        title="G사 CTO 멘토링"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />
      <BoardObject
        src="/dummy/profile.jpg"
        title="G사 CTO 멘토링"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />
      <BoardObject
        src="/dummy/profile.jpg"
        title="G사 CTO 멘토링"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />
      <BoardObject
        src="/dummy/profile.jpg"
        title="G사 CTO 멘토링"
        detail="시니어 경력 17년차 프론트엔드 개발자..."
        category="세무·법무·노무"
        minPrice="✅최소 9,999"
        startDate="9999.99.99"
        endDate="9999.99.99"
      />
    </main>
  );
}
