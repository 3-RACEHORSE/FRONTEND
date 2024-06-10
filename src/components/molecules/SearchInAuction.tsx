"use client";

import React, { useState, useEffect } from "react";
import SearchInput from "../atoms/input/SearchInput";
import Alarm from "../atoms/icon/Alarm";
import Link from "next/link";
import BackBtn from "../atoms/button/BackBtn";
import Image from "next/image";
import Cookies from "js-cookie";
import { FaSearch } from "react-icons/fa";
import styles from "@/styles/layout/header.module.scss";
import Logo from "@/asset/svgs/Logo";
import { GoBell } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchInAuction() {
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
      <Logo />
      <div className={styles["header-element-container"]}>
        <IoSearchOutline size={30} color="black" />

        <GoBell size={30} color="black" />
      </div>
    </>
  );
}
