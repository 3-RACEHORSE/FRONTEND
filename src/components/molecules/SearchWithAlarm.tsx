"use client";

import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";
import { IoSearchOutline } from "react-icons/io5";
import styles from "@/styles/layout/header.module.scss";
import Logo from "@/asset/svgs/Logo";
import { GoBell } from "react-icons/go";
import { usePathname } from "next/navigation";

export default function SearchWithAlarm() {
  const pathName = usePathname();
  return (
    <>
      <Logo />
      <div className={styles["header-element-container"]}>
        <IoSearchOutline size={30} color="white" />
        <GoBell size={30} color="white" />
      </div>
    </>
  );
}
