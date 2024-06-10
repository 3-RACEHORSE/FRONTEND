"use client";

import React, { useState, useEffect } from "react";
import SearchInput from "../atoms/input/SearchInput";
import Alarm from "../atoms/icon/Alarm";
import Link from "next/link";
import BackBtn from "../atoms/button/BackBtn";
import Image from "next/image";
import Cookies from "js-cookie";
import { IoSearchOutline } from "react-icons/io5";
import styles from "@/styles/layout/header.module.scss";
import Logo from "@/asset/svgs/Logo";
import { GoBell } from "react-icons/go";

export default function SearchWithAlarm() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/images/header/logo.png");

  useEffect(() => {
    const savedMode = Cookies.get("mode");
    if (!savedMode) {
      Cookies.set("mode", "light");
    } else if (savedMode === "dark") {
      setIsDarkMode(true);
      setLogoSrc("/images/header/logo.png");
    } else {
      setIsDarkMode(false);
      setLogoSrc("/images/header/logoD.png");
    }
  }, []);

  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
    const newMode = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", newMode);
    Cookies.set("mode", newMode);
    setLogoSrc(
      newMode === "dark"
        ? "/images/header/logo.png"
        : "/images/header/logoD.png"
    );
  };

  console.log("현재 모드는", isDarkMode);

  return (
    <>
      {/* 아래를 활성화 하면 다크모드기능이미지 이다. */}
      {/* <Image
        src={logoSrc}
        width={30}
        height={30}
        alt="logo"
        onClick={darkModeHandler}
      /> */}
      {/* <button onClick={darkModeHandler}>다크모드</button> */}
      {/* <SearchInput /> */}
      <Logo />
      <div className={styles["header-element-container"]}>
        <IoSearchOutline size={30} color="white" />

        <GoBell size={30} color="white" />
      </div>
    </>
  );
}
