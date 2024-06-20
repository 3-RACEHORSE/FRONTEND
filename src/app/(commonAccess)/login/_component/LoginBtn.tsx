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

  const onClickGoogleSignIn = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/join", // 추후 변경 필요
    });
  };

  const onClickKaKaoSignIn = async () => {
    await signIn("kakao", {
      redirect: true,
      callbackUrl: "/join", // 추후 변경 필요
    });
  };

  const onClickSignOut = async () => {
    await signOut();
  };

  if (isSession) {
    // 세션이 연결되어있다면, 하지만, 토큰은 만료
    onClickSignOut();
  }

  return (
    <div>
      {isSession && (
        <button className={styles["login-main-btn"]} onClick={onClickSignOut}>
          로그아웃
        </button>
      )}

      {!isSession && (
        <div className={styles["login-main-btn-container"]}>
          <button
            className={styles["login-main-btn"]}
            onClick={onClickGoogleSignIn}
          >
            <img src="/icons/googleIcon.png" />
            Get started with Google
          </button>
          <button
            className={styles["login-main-btn"]}
            onClick={onClickKaKaoSignIn}
          >
            <img src="/icons/kakaoIcon.png" />
            Get started with KaKao
          </button>
        </div>
      )}
    </div>
  );
}
