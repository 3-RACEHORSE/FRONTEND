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
import { useState } from "react";

export default function Header() {
  const pathName = usePathname();
  console.log("pathNmae", pathName);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
    }
  };

  return (
    <header className={styles["main-header-layout"]}>
      <div className={styles["main-header-container"]}>
        <SearchWithAlarm />
      </div>
      <button onClick={darkModeHandler}>
        {isDarkMode ? "light-mode" : "dark-mode"}
      </button>
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
