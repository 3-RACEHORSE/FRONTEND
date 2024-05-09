"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/login/login.module.scss";

export default function LoginBtn() {
  return (
    <>
      <button className={styles["login-main-btn"]}>
        Get started with Google
      </button>
    </>
  );
}
