"use client";

import Image from "next/image";
import styles from "@/styles/login/login.module.scss";
import LoginBtn from "./_component/LoginBtn";
import BackHeader from "@/components/organism/layout/BackHeader";
import React, { useEffect, useState } from "react";

export default function Page() {
  const LoginLogo = "/dummy/loginLogo.png";
  const LoginLogoDark = "/dummy/loginLogoDark.png";

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleDarkModeChange = () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      setIsDarkMode(isDark);
    };

    handleDarkModeChange();

    const observer = new MutationObserver(handleDarkModeChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

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
