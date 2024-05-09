"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/layout/nav.module.scss";
import ImgBtn from "../atoms/ImgBtn";

export default function NavBar() {
  const HomeBtn = "./navbar/homeBtn.png";
  const ActionBtn = "./navbar/actionBtn.png";
  const SearchBtn = "./navbar/searchBtn.png";
  const ChartBtn = "./navbar/chartBtn.png";
  const MyBtn = "./navbar/myBtn.png";

  return (
    <>
      <nav className={styles["nav-main-container"]}>
        <ImgBtn src={HomeBtn} width="50px" height="50px" />
        <ImgBtn src={ActionBtn} width="50px" height="50px" />
        <ImgBtn src={SearchBtn} width="50px" height="50px" />
        <ImgBtn src={ChartBtn} width="50px" height="50px" />
        <ImgBtn src={MyBtn} width="50px" height="50px" />
      </nav>
    </>
  );
}
