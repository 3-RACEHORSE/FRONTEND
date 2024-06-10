"use client";

import styles from "@/styles/layout/header.module.scss";
import SearchWithAlarm from "@/components/molecules/SearchWithAlarm";
import SliderWithCategory from "@/components/molecules/SliderWithCategory";
import { usePathname } from "next/navigation";
import BoardCategory from "@/components/molecules/BoardCategory";
import SearchInAuction from "@/components/molecules/SearchInAuction";

export default function AuctionHeader() {
  const pathName = usePathname();
  console.log("pathNmae", pathName);
  return (
    <header className={styles["main-header-layout"]}>
      <div className={styles["main-header-container"]}>
        <SearchInAuction />
      </div>

      {/* {pathName === "/" ? (
        <SliderWithCategory />
      ) : pathName.startsWith("/auction") ? (
        <BoardCategory />
      ) : (
        <></>
      )} */}
    </header>
  );
}
