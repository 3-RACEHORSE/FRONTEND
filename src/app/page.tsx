import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import MainBanner from "@/app/(commonAccess)/_main/MainBanner";
import MainArticle from "@/components/organism/layout/MainArticle";
import styles from "@/styles/main/main.module.scss";
import BoardTitle from "@/components/organism/main/BoardTitle";
import SimpleBoardObject from "@/components/organism/main/SimpleBoardObject";
import Footer from "@/components/organism/layout/Footer";
import HomeNavBar from "@/components/organism/layout/HomeNavBar";

export default async function Home() {
  // git action을 위한 주석3

  // const session = await auth(); // session 호출 추가
  // console.log(session);
  // promise all
  return (
    <main>
      <Header />
      <MainBanner />
      <HomeNavBar />
    </main>
  );
}
