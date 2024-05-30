"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/login/login.module.scss";
import { signIn, signOut } from "next-auth/react";
import { sessionValid } from "@/utils/session/sessionValid";

export default function LoginBtn() {
  const [isSession, setIsSession] = useState<boolean>(false); // 로그인 여부

  const handleSession = async () => {
    const loginValid = await sessionValid();
    if (loginValid) {
      setIsSession(loginValid.valid);
    }
  };

  useEffect(() => {
    handleSession();
  }, []);

  const onClick = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/join", // 추후 변경 필요
    });
  };

  const onClick2 = async () => {
    await signOut();
  };

  return (
    <div>
      {isSession ? (
        <button className={styles["login-main-btn"]} onClick={onClick2}>
          로그아웃
        </button>
      ) : (
        <button className={styles["login-main-btn"]} onClick={onClick}>
          Get started with Google
        </button>
      )}
    </div>
  );
}
