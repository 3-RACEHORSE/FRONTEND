"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/layout/header.module.scss";
import BackBtn from "@/components/atoms/button/BackBtn";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";

export default function BackHeader() {
  const handleBack = () => {
    console.log("d");
  };

  return (
    <>
      <header className={styles["header-main-container"]}>
        <BackBtn onClick={handleBack} />
        <TitleText title="회원가입" />
        <Gap width={30} height={30} />
      </header>
    </>
  );
}
