import { auth } from "@/auth";
import { cookies } from "next/headers";
import Scroll from "@/app/(commonAccess)/auction/[id]/_component/Scroll";
import Header from "@/components/organism/layout/Header";
import WriteBar from "@/components/organism/layout/WriteBar";
import NavBar from "@/components/organism/layout/NavBar";
import AuctionHeader from "@/components/organism/layout/AuctionHeader";
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
      {/* <WriteBar /> */}
      <NavBar />
    </main>
  );
}
