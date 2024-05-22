"use client";

import React, { ChangeEvent } from "react";
import SearchInput from "../atoms/input/SearchInput";
import Alarm from "../atoms/icon/Alarm";
import Link from "next/link";
import BackBtn from "../atoms/button/BackBtn";
import Image from "next/image";

export default function SearchWithAlarm() {
  return (
    <>
      <Image
        // className={styles["button"]}
        src="/images/header/logo.png"
        width={30}
        height={30}
        alt="few"
      />
      <SearchInput />
      <Alarm />
    </>
  );
}
