"use client";

import React, { ChangeEvent } from "react";
import SearchInput from "../atoms/input/SearchInput";
import Alarm from "../atoms/icon/Alarm";
import CategoryText from "../atoms/Text/CategoryText";

export default function SliderWithCategory() {
  return (
    <nav className="flex flex-col justify-center overflow-x-auto">
      <ul className="flex">
        <img
          src="/images/header/slider1.png"
          style={{
            height: "17px",
            marginTop: "11px",
            marginLeft: "10px",
          }}
        />

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
