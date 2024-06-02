"use client";

import React, { useState } from "react";
import styles from "@/styles/organism/search.module.scss";

function SearchList() {
  const items = [
    "📢이번주 성과",
    "아토믹 디자인으로 인한 개발속도 향상",
    "shadcn을 통한 통일성 있는 디자인",
    "@@@@@@@@@@@@@@@@@@@@@@@",
    "📢향후 계획",
    "1. 오늘 마이페이지 구현",
    "2. 토요일에 api 연동",
    "3. 일요일에 리팩토링",
  ];

  return (
    <div className={styles["fixed-container"]}>
      {items.map((item, index) => (
        <div key={index} className={styles["search-keyword"]}>
          <p>{item}</p>
          <span>↖</span>
        </div>
      ))}
    </div>
  );
}

export default SearchList;
