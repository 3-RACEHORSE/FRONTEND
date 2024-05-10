"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/layout/nav.module.scss";
import ImgBtn from "../atoms/ImgBtn";

export default function NavBar() {
  const HomeBtn = "/images/navbar/homeBtn.png";
  const ActionBtn = "/images/navbar/actionBtn.png";
  const SearchBtn = "/images/navbar/searchBtn.png";
  const ChartBtn = "/images/navbar/chartBtn.png";
  const MyBtn = "/images/navbar/myBtn.png";

  return (
    <>
      <nav className={styles["nav-main-container"]}>
        <ImgBtn
          src={HomeBtn}
          width={45}
          height={100}
          marginLeft="10px"
          marginRight="10px"
        />
        <ImgBtn
          src={ActionBtn}
          width={45}
          height={100}
          marginLeft="10px"
          marginRight="10px"
        />
        <ImgBtn
          src={SearchBtn}
          width={45}
          height={100}
          marginLeft="10px"
          marginRight="10px"
        />
        <ImgBtn
          src={ChartBtn}
          width={45}
          height={100}
          marginLeft="10px"
          marginRight="10px"
        />
        <ImgBtn
          src={MyBtn}
          width={45}
          height={100}
          marginLeft="10px"
          marginRight="10px"
        />
      </nav>
    </>
  );
}
