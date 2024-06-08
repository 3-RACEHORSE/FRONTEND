"use client";

import Image from "next/image";
import styles from "@/styles/login/login.module.scss";
import LoginBtn from "./_component/LoginBtn";
import BackHeader from "@/components/organism/layout/BackHeader";
import React, { useEffect, useState } from "react";
import { useDarkMode } from "@/hooks/common/checkDarkMode";

export default function Page() {
  const isDarkMode = useDarkMode();
  const [logoSrc, setLogoSrc] = useState("");

  useEffect(() => {
    setLogoSrc(
      isDarkMode ? "/dummy/loginLogoDark.png" : "/dummy/loginLogo.png"
    );
  }, [isDarkMode]);

  return (
    <main>
      {/* <BackHeader title={"LOGIN"} /> */}
      <div className={styles["login-main-frame"]}>
        <img src={logoSrc} alt="" width={220} height={220} />
      </div>
      <div className={styles["login-btn-frame"]}>
        <LoginBtn />
      </div>
    </main>
  );
}
