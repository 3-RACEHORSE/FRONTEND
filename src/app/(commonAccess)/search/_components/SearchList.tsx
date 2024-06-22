"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/organism/search.module.scss";
import { sessionValid } from "@/utils/session/sessionValid";
import Link from "next/link";

interface SearchListProps {
  // authorization?: any;
  // uuid?: any;
  searchText?: string;
}

function SearchList({ searchText }: SearchListProps) {
  const [items, setItems] = useState<string[]>([]);

  console.log(searchText);
  const isHangul = (text: string): boolean => {
    const pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return pattern.test(text);
  };

  //api 통신
  const handleSearchText = async (searchText: any) => {
    // 한글이면 모음만 있거나 자음만 있는 경우는 요청하지 않음
    if (isHangul(searchText) && !/[가-힣]/.test(searchText)) {
      console.log("모음 자음의 경우 요청 X");
      return;
    }

    const result = await sessionValid();
    if (result) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/search-title?data=${searchText}`,
        {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${result.authorization}`,
            uuid: `${result.uuid}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("검색결과 에러");
      }
      const data = await res.json();
      console.log(data);
      setItems(data.result);
    }
  };

  useEffect(() => {
    handleSearchText(searchText);
  }, [searchText]);

  return (
    <div className={styles["fixed-container"]}>
      {items.map((item, index) => (
        <Link
          href={`/auction/search${item}`}
          key={index}
          className={styles["search-keyword"]}
        >
          <p>{item}</p>
          <span>↖</span>
        </Link>
      ))}
    </div>
  );
}

export default SearchList;
