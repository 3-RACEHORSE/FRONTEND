import { cookies } from "next/headers";
import BackHeader from "@/components/organism/layout/BackHeader";
import AuctionProgressInfo from "@/components/organism/auctionProgress/AuctionProgressInfo";
import "@/styles/auctionProgress/auctionProgress.css";
import ColorCircleAnimation from "@/components/organism/animation/ColorCircleAnimation";
import getVaildEnterAuction from "@/apis/getValidEnterAuction";

export default async function Page(props: any) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const pathName = props.params.id;

  await getVaildEnterAuction(pathName);

  return (
    <main>
      <BackHeader title="" type="auction" />
      <AuctionProgressInfo
        authorization={authorization}
        uuid={uuid}
        pathName={pathName}
      />{" "}
      <ColorCircleAnimation />
      <div className="auction-effect"></div>
    </main>
  );
}
