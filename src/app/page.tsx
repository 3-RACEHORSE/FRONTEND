import Header from "@/components/organism/layout/Header";
import MainBanner from "@/app/(commonAccess)/_main/MainBanner";
import HomeNavBar from "@/components/organism/layout/HomeNavBar";
import { getMainPageBannerData } from "@/apis/getMainPageBannerData";

export default async function Home() {
  const data = await getMainPageBannerData();
  return (
    <main>
      <Header />
      <MainBanner data={data} />
      <HomeNavBar />
    </main>
  );
}
