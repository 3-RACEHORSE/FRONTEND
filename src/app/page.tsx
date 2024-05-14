import Image from "next/image";
import { auth } from "@/auth"; // auth 추가
import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import MainBanner from "@/app/(commonAccess)/_main/MainBanner";
import MainArticle from "@/components/organism/layout/MainArticle";
import styles from "@/styles/main/main.module.scss";
import BoardTitle from "@/components/organism/main/BoardTitle";
import SimpleBoardObject from "@/components/organism/main/SimpleBoardObject";
import CategoryText from "@/components/atoms/Text/CategoryText";
import Footer from "@/components/organism/layout/Footer";

export default async function Home() {
  const session = await auth(); // session 호출 추가
  console.log(session);

  return (
    <main>
      <Header />
      <MainBanner />
      <MainArticle />
      <div className={styles["infoBar"]}>
        <div className={styles["infoText"]}>경매 통계(금일)</div>
        <div className={styles["detailLink"]}>상세보기</div>
      </div>
      <BoardTitle
        title="HOT 경매글 📢"
        detail="지금 가장 인기있는 경매글을 찾아보세요!"
      />
      {/* x 스크롤  */}
      <div className="flex flex-col justify-center w-full h-200">
        <ul className="flex overflow-x-auto">
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
          <SimpleBoardObject
            category="세무·법무·노무"
            title="G사 CTO 멘토링"
            content="시니어 경력 17년차 프.."
            src="/dummy/profile.jpg"
            minPrice="9,999"
          />
        </ul>
      </div>

      <Footer />
      {/* <NavBar /> */}
    </main>
  );
}
