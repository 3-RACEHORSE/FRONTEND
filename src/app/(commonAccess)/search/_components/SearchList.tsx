"use client";

import React, { useState } from "react";

function SearchList() {
  const items = [
    "디자인",
    "디자인 개발",
    "디자인 좋아지는 법",
    "디자인 잘하는 법",
    "디자인 1타 강사",
    "디자인과 철학",
    "디자인은 아토믹 디자인",
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
