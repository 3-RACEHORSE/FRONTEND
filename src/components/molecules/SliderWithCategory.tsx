"use client";

import React, { useEffect, useState } from "react";
import CategoryText from "../atoms/Text/CategoryText";
import { useDarkMode } from "@/hooks/common/checkDarkMode";

export default function SliderWithCategory() {
  const isDarkMode = useDarkMode();

  return (
    <nav className="flex flex-col justify-center overflow-x-auto">
      <ul className="flex">
        {/* <img
          src={
            isDarkMode
              ? "/images/header/slider_dark.png"
              : "/images/header/slider.png"
          }
          style={{
            height: "17px",
            marginTop: "11px",
            marginLeft: "10px",
          }}
        /> */}

        <CategoryText title="디자인" />
        <CategoryText title="IT·프로그래밍" />
        <CategoryText title="영상·사진·음향" />
        <CategoryText title="마케팅" />
        <CategoryText title="번역·통역" />
        <CategoryText title="문서·글쓰기" />
        <CategoryText title="창업·사업" />
        <CategoryText title="세무·법무·노무" />
        <CategoryText title="취업·입시" />
        <CategoryText title="투잡·노하우" />
        <CategoryText title="직업역량 레슨" />
        <CategoryText title="운세" />
        <CategoryText title="심리상담" />
        <CategoryText title="취미 레슨" />
      </ul>
    </nav>
  );
}
