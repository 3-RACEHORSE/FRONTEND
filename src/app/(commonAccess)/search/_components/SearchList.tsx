"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/organism/search.module.scss";

interface SearchListProps {
  searchText?: string;
}

function SearchList({ searchText }: SearchListProps) {
  // const items = [
  //   "📢이번주 성과",
  //   "아토믹 디자인으로 인한 개발속도 향상",
  //   "shadcn을 통한 통일성 있는 디자인",
  //   "@@@@@@@@@@@@@@@@@@@@@@@",
  //   "📢향후 계획",
  //   "1. 오늘 마이페이지 구현",
  //   "2. 토요일에 api 연동",
  //   "3. 일요일에 리팩토링",
  // ];

  const [items, setItems] = useState<string[]>([]);

  console.log(searchText);

  //api 통신
  const handleSearchText = async (searchText: any) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search-title?data=${searchText}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    setItems(data.result);
  };

  useEffect(() => {
    handleSearchText(searchText);
  }, [searchText]);

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
