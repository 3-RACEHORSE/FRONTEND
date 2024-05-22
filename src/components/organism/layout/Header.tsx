"use client";

import styles from "@/styles/layout/header.module.scss";
import BackBtn from "@/components/atoms/button/BackBtn";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";
import SearchInput from "@/components/atoms/input/SearchInput";
import Alarm from "@/components/atoms/icon/Alarm";
import SearchWithAlarm from "@/components/molecules/SearchWithAlarm";
import SliderWithCategory from "@/components/molecules/SliderWithCategory";
import { usePathname } from "next/navigation";
import BoardCategory from "@/components/molecules/BoardCategory";
import Link from "next/link";

export default function Header() {
  const pathName = usePathname();
  console.log("pathNmae", pathName);

  return (
    <header className={styles["main-header-layout"]}>
      <div className={styles["main-header-container"]}>
        <SearchWithAlarm />
      </div>
      {/* 추후 수정 필요 */}
      {pathName === "/" ? (
        <SliderWithCategory />
      ) : pathName.startsWith("/auction") ? (
        <BoardCategory />
      ) : (
        <></>
      )}
    </header>
  );
}
