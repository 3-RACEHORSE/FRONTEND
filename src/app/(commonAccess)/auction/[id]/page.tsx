import { cookies } from "next/headers";
import Scroll from "@/app/(commonAccess)/auction/[id]/_component/Scroll";
import NavBar from "@/components/organism/layout/NavBar";
import AuctionHeader from "@/components/organism/layout/AuctionHeader";
export default async function Page() {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  return (
    <main>
      <AuctionHeader />
      <Scroll authorization={authorization} uuid={uuid} />
      <NavBar />
    </main>
  );
}
