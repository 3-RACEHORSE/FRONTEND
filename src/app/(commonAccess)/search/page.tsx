import SearchForm from "@/app/(commonAccess)/search/_components/SearchForm";
import Image from "next/image";
import styles from "@/styles/layout/header.module.scss";

import RecommendSearch from "@/app/(commonAccess)/search/_serverComponents/RecommendSearch";
import RecentSearch from "./_components/RecentSearch";
import Header from "@/components/organism/layout/Header";
import SearchList from "./_components/SearchList";
import Alarm from "@/components/atoms/icon/Alarm";
import BackBtn from "@/components/atoms/button/BackBtn";

export default function Page() {
  return (
    <>
      <header className={styles["main-header-layout"]}>
        <div className={styles["main-header-container"]}>
          <Image
            className={styles["button"]}
            src="/images/header/back.png"
            width={20}
            height={20}
            alt="few"
          />
          <SearchForm />
          <Alarm />
        </div>
      </header>
      {/* 최근 검색어 클라이언트 컴포넌트*/}
      {/* 추천검색어 - 서버 컴포넌트 */}
      <RecentSearch />
      <RecommendSearch />
    </>
  );
}
