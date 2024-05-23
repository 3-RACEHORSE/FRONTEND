"use client";

import React, { useState } from "react";

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
    <>
      <div
        className="bg-[#ffffff] p-[10px]"
        style={{
          width: "100%",
          height: "calc(100% - 80px)",
          position: "fixed",
          bottom: "0",
          right: "0",
          zIndex: "999",
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "5px",
              paddingBottom: "10px",
              paddingTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #d4d4d4",
              fontSize: "12px",
            }}
          >
            <p>{item}</p>
            <span>↖</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default SearchList;
