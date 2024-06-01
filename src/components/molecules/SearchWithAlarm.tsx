"use client";

import React, { ChangeEvent } from "react";
import SearchInput from "../atoms/input/SearchInput";
import Alarm from "../atoms/icon/Alarm";
import Link from "next/link";
import BackBtn from "../atoms/button/BackBtn";
import Image from "next/image";
import { useState } from "react";

export default function SearchWithAlarm() {
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
    <>
      <Image
        // className={styles["button"]}
        src={
          isDarkMode ? "/images/header/logo.png" : "/images/header/logoD.png"
        }
        width={30}
        height={30}
        alt="few"
        onClick={darkModeHandler}
      />
      <SearchInput />
      <Alarm />
    </>
  );
}
