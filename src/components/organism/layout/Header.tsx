"use client";

import styles from "@/styles/layout/header.module.scss";
import SearchWithAlarm from "@/components/molecules/SearchWithAlarm";
import SliderWithCategory from "@/components/molecules/SliderWithCategory";
import { usePathname } from "next/navigation";
import BoardCategory from "@/components/molecules/BoardCategory";
import AlarmConnect from "@/components/organism/alarm/AlarmConnect";

export default function Header() {
  const pathName = usePathname();
  console.log("pathNmae", pathName);
  return (
    <header className={styles["main-header-layout"]}>
      <div className={styles["main-header-container"]}>
        <AlarmConnect />
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
