import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import MainBanner from "@/app/(commonAccess)/_main/MainBanner";
import MainArticle from "@/components/organism/layout/MainArticle";
import styles from "@/styles/main/main.module.scss";
import BoardTitle from "@/components/organism/main/BoardTitle";
import SimpleBoardObject from "@/components/organism/main/SimpleBoardObject";
import Footer from "@/components/organism/layout/Footer";
import HomeNavBar from "@/components/organism/layout/HomeNavBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getMainPageBannerData() {
  const authorization = cookies().get("authorization")?.value;
  console.log(authorization);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/main`,
    {
      // cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`, // Add Bearer if needed
      },
    }
  );
  // console.log(res.status);
  if (res.status === 401 || res.status === 500) {
    // 이후 에러코드 401로 수정 필요
    console.log("토큰없");
    redirect("https://fe-meetplus.vercel.app/login");
  }
  if (!res.ok) {
    // throw new Error("Network Error");
    redirect("https://fe-meetplus.vercel.app/login");
  }
  const data = await res.json();
  return data;
}

export default async function Home() {
  // git action을 위한 주석3

  // const session = await auth(); // session 호출 추가
  // console.log(session);
  // promise all

  const data = await getMainPageBannerData();
  // console.log(data);
  return (
    <main>
      <Header />
      <MainBanner data={data} />
      <HomeNavBar />
    </main>
  );
}
