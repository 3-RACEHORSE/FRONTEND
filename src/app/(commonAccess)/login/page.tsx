"use client";

import Image from "next/image";
import styles from "@/styles/login/login.module.scss";
import LoginBtn from "./_component/LoginBtn";
import BackHeader from "@/components/organism/layout/BackHeader";
import React from "react";
import { useDarkMode } from "@/hooks/common/checkDarkMode";
import Logo from "@/svgs/logo.svg";
import LoginLogo from "@/asset/svgs/LoginLogo";
import LoginLogoD from "@/asset/svgs/LoginLogoD";

export default function Page() {
  const isDarkMode = useDarkMode();

  return (
    <main>
      {/* <BackHeader title={"LOGIN"} /> */}
      <div className={styles["login-main-frame"]}>
        {isDarkMode ? <LoginLogoD /> : <LoginLogo />}
      </div>
      <div className={styles["login-btn-frame"]}>
        <LoginBtn />
      </div>
    </main>
  );
}
