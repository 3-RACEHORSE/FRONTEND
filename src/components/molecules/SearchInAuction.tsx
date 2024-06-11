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
      <Logo />
      <div className={styles["header-element-container"]}>
        <IoSearchOutline size={30} />
        <GoBell size={30} />
      </div>
    </>
  );
}
