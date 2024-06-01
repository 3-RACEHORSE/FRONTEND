"use client";

import SearchForm from "@/app/(commonAccess)/search/_components/SearchForm";
import Image from "next/image";
import styles from "@/styles/layout/header.module.scss";

import RecommendSearch from "@/app/(commonAccess)/search/_serverComponents/RecommendSearch";
import RecentSearch from "./_components/RecentSearch";
import Alarm from "@/components/atoms/icon/Alarm";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDarkMode } from "@/hooks/common/checkDarkMode";

export default function Page() {
  useDarkMode(); // 하위요소에서 호출 가능

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <main>
      <header className={styles["main-header-layout"]}>
        <div className={styles["main-header-container"]}>
          <IoMdArrowRoundBack
            onClick={handleBack}
            style={{ width: "30px", height: "30px" }}
          />
          <SearchForm />
          <Alarm />
        </div>
      </header>

      <RecentSearch />
      <RecommendSearch />
    </main>
  );
}
