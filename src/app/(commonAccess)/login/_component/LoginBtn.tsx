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
    await signIn("google", {
      redirect: true,
      callbackUrl: "/kakao", // 추후 변경 필요
    });
  };

  const onClickGoogleSignOut = async () => {
    await signOut();
  };

  const onClickKaKaoSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      {isSession && (
        <button
          className={styles["login-main-btn"]}
          onClick={onClickGoogleSignIn}
        >
          Get started with Google
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
