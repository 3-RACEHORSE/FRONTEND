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
import { redirect } from "next/navigation";

async function getVaildEnterAuction(pathName: any) {
  const authorization = cookies().get("authorization")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/state/${pathName}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`,
      },
    }
  );

  const valid = await res.json();
  //분기처리
  if (!valid) {
    // 백으로 돌리도록 추후 리펙토링 필요
    redirect(`http://localhost:3000/detail/${pathName}`);
  }
  return;
}

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
