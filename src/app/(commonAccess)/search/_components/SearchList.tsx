"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/organism/search.module.scss";
import Link from "next/link";
import { getSearchTextData } from "@/apis/getSearchTextData";

interface SearchListProps {
  searchText?: string;
}

function SearchList({ searchText }: SearchListProps) {
  const [items, setItems] = useState<string[]>([]);

  const isHangul = (text: string): boolean => {
    const pattern = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    return pattern.test(text);
  };

  const handleSearchText = async (searchText: any) => {
    if (isHangul(searchText) && !/[가-힣]/.test(searchText)) {
      return;
    }
    const data = await getSearchTextData(searchText);
    console.log(data);
    setItems(data);
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
