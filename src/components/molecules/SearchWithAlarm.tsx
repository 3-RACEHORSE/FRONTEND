"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import SearchInput from "../atoms/input/SearchInput";
import Alarm from "../atoms/icon/Alarm";
import Link from "next/link";
import BackBtn from "../atoms/button/BackBtn";
import Image from "next/image";
import Cookies from "js-cookie";

export default function SearchWithAlarm() {
  const savedMode = Cookies.get("mode");
  const initialState = savedMode === "light" ? false : true;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(initialState);
  }, []);

  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
    const newMode = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", newMode);
    Cookies.set("mode", newMode);
  };

  console.log("현재 모드는", isDarkMode);

  const logoSrc = isDarkMode
    ? "/images/header/logo.png"
    : "/images/header/logoD.png";
  const logoAlt = isDarkMode ? "logo" : "logoD";

  return (
    <>
      <Image
        src={logoSrc}
        width={30}
        height={30}
        alt={logoAlt}
        onClick={darkModeHandler}
      />
      <SearchInput />
      <Alarm />
    </>
  );
}
