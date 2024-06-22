import { auth } from "@/auth";
import { cookies } from "next/headers";
import Scroll from "@/app/(commonAccess)/auction/[id]/_component/Scroll";
import Header from "@/components/organism/layout/Header";
import WriteBar from "@/components/organism/layout/WriteBar";
import NavBar from "@/components/organism/layout/NavBar";
import AuctionHeader from "@/components/organism/layout/AuctionHeader";
import BoardObject from "@/components/organism/auction/BoardObject";
import Link from "next/link";
import BackHeader from "@/components/organism/layout/BackHeader";
import AuctionProgressInfo from "@/components/organism/auctionProgress/AuctionProgressInfo";
import "@/styles/auctionProgress/auctionProgress.css";
import CircleAnimation from "@/components/organism/animation/CircleAnimation";
import ColorCircleAnimation from "@/components/organism/animation/ColorCircleAnimation";

export default async function Page(props: any) {
  const authorization = cookies().get("authorization")?.value;
  const uuid = cookies().get("uuid")?.value;
  const pathName = props.params.id;
  // console.log(authorization, uuid);
  // console.log(props.params.id);
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
