"use client";

import styles from "@/styles/login/login.module.scss";
import LoginBtn from "./_component/LoginBtn";
import React from "react";
import { useDarkMode } from "@/hooks/system/checkDarkMode";
import LoginLogo from "@/asset/svgs/LoginLogo";
import LoginLogoD from "@/asset/svgs/LoginLogoD";

export default function Page() {
  const isDarkMode = useDarkMode();

  return (
    <main>
      <div className={styles["login-main-frame"]}>
        {isDarkMode ? <LoginLogoD /> : <LoginLogo />}
      </div>
      <div className={styles["login-btn-frame"]}>
        <LoginBtn />
      </div>
    </main>
  );
}
