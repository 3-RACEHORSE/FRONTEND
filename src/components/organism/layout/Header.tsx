import React, { useState, useEffect } from "react";
import styles from "@/styles/layout/header.module.scss";
import BackBtn from "@/components/atoms/button/BackBtn";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";
import SearchInput from "@/components/atoms/input/SearchInput";
import Alarm from "@/components/atoms/icon/Alarm";
import SearchWithAlarm from "@/components/molecules/SearchWithAlarm";
import SliderWithCategory from "@/components/molecules/SliderWithCategory";

export default function Header() {
  const AlarmBtn = "/images/header/alarm.png";

  return (
    <header className={styles["main-header-layout"]}>
      <div className={styles["main-header-container"]}>
        <SearchWithAlarm />
      </div>
      <SliderWithCategory />
    </header>
  );
}
