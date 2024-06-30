"use client";

import SearchForm from "@/app/(commonAccess)/search/_components/SearchForm";
import styles from "@/styles/layout/header.module.scss";
import RecommendSearch from "@/app/(commonAccess)/search/_serverComponents/RecommendSearch";
import RecentSearch from "./_components/RecentSearch";
import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDarkMode } from "@/hooks/system/checkDarkMode";
import Gap from "@/components/atoms/etc/Gap";

export default function Page() {
  useDarkMode();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div style={{ height: "100vh" }}>
      <header className={styles["main-header-layout"]}>
        <div className={styles["main-header-container"]}>
          <IoMdArrowRoundBack
            onClick={handleBack}
            style={{ width: "30px", height: "30px" }}
          />
          <SearchForm />
          {/* <GoBell size={27} /> */}
          <Gap width={30} height={30} />
        </div>
      </header>
      <RecentSearch />
      <RecommendSearch />
    </div>
  );
}
