import BoardObject from "@/components/organism/auction/BoardObject";
import SubScribeInfo from "@/components/organism/subscribe/SubscribeInfo.tsx";

import SubscribeObject from "@/components/organism/subscribe/SubscribeObject";
import HorizontalPage from "@/app/(userAccess)/subscribe/_component/HorizontalPage";
import { cookies } from "next/headers";

export default function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;

  return (
    <main>
      <SubScribeInfo title="✅구독" />
      <HorizontalPage authorization={authorization} uuid={uuid} />

      <SubScribeInfo title="✅북마크" />
    </main>
  );
}
