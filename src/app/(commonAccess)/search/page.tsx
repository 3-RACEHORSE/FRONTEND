"use client";

import SearchForm from "@/app/(commonAccess)/search/_components/SearchForm";
import Image from "next/image";
import styles from "@/styles/layout/header.module.scss";

import RecommendSearch from "@/app/(commonAccess)/search/_serverComponents/RecommendSearch";
import RecentSearch from "./_components/RecentSearch";
import Alarm from "@/components/atoms/icon/Alarm";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

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
            onClick={handleBack}
          />
          <SearchForm />
          <Alarm />
        </div>
      </header>

      <RecentSearch />
      <RecommendSearch />
    </>
  );
}
