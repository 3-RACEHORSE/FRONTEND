"use client";

import React, { ChangeEvent } from "react";
import SearchInput from "../atoms/input/SearchInput";
import Alarm from "../atoms/icon/Alarm";
import Link from "next/link";
import BackBtn from "../atoms/button/BackBtn";
import Image from "next/image";
import { useState } from "react";
import Cookies from "js-cookie";

export default function SearchWithAlarm() {
  const btnLogo = "/images/header/logo.png";
  const btnLogoDark = "/images/header/logoD.png";

  const savedMode = Cookies.get("mode");
  const initialState = savedMode === "light" ? false : true;
  const [isDarkMode, setIsDarkMode] = useState(initialState);

  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
    const newMode = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", newMode);
    Cookies.set("mode", newMode);
  };

  return (
    <>
      {/* <Image
        // className={styles["button"]}
        src={isDarkMode ? `${btnLogoDark}` : `${btnLogo}`}
        
        width={30}
        height={30}
        alt="few"
        onClick={darkModeHandler}
      /> */}
      <button onClick={darkModeHandler}>다크모드</button>
      <SearchInput />
      <Alarm />
    </>
  );
}
