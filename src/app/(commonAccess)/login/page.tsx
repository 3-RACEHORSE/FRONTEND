"use client";

import Image from "next/image";
import styles from "@/styles/login/login.module.scss";
import LoginBtn from "./_component/LoginBtn";
import BackHeader from "@/components/organism/layout/BackHeader";
// import React, { useEffect, useState } from "react";
import { useDarkMode } from "@/hooks/common/checkDarkMode";

export default function Page() {
  const LoginLogo = "/dummy/loginLogo.png";
  const LoginLogoDark = "/dummy/loginLogoDark.png";

  const isDarkMode = useDarkMode();

  return (
    <main>
      <BackHeader title={"LOGIN"} />
      <div className={styles["login-main-frame"]}>
        <Image
          src={isDarkMode ? `${LoginLogoDark}` : `${LoginLogo}`}
          alt=""
          width={220}
          height={220}
        />
      </div>
      <div className={styles["login-btn-frame"]}>
        <LoginBtn />
      </div>
    </main>
  );
}
