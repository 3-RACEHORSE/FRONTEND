import Image from "next/image";
import { auth } from "@/auth"; // auth 추가
import Header from "@/components/organism/layout/Header";
import NavBar from "@/components/organism/layout/NavBar";
import MainBanner from "@/app/(commonAccess)/_main/MainBanner";
import MainArticle from "@/components/organism/layout/MainArticle";
import styles from "@/styles/main/main.module.scss";
import BoardTitle from "@/components/organism/main/BoardTitle";

export default async function Home() {
  const session = await auth(); // session 호출 추가
  console.log(session);

  return (
    <main className={styles["main"]}>
      <Header />
      <MainBanner />
      <MainArticle />
      <NavBar />
      <div className={styles["infoBar"]}>
        <div className={styles["infoText"]}>경매 통계(금일)</div>
        <div className={styles["detailLink"]}>상세보기</div>
      </div>
      <BoardTitle
        title="HOT 경매글 📢"
        detail="지금 가장 인기있는 경매글을 찾아보세요!"
      />
    </main>
  );
}
