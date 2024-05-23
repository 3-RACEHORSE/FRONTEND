import SubScribeInfo from "@/components/organism/subscribe/SubscribeInfo.tsx";

import SubscribeObject from "@/components/organism/subscribe/SubscribeObject";

export default function Page() {
  return (
    <main>
      <SubScribeInfo />
      <div className="flex flex-col justify-center w-full h-200">
        <div className="flex overflow-x-auto">
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
          <SubscribeObject />
        </div>
      </div>
    </main>
  );
}
