"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/login/login.module.scss";
import { signIn } from "next-auth/react";

export default function LoginBtn() {
  const onClick = async () => {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/join", // 추후 변경 필요
    });
  };

  return (
    <>
      <button className={styles["login-main-btn"]} onClick={onClick}>
        Get started with Google
      </button>
    </>
  );
}
