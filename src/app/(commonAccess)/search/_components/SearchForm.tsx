"use client";

import React, { useState } from "react";
import SearchList from "./SearchList";
import { useRouter } from "next/navigation";
import styles from "@/styles/organism/search.module.scss";
import { IoSearchOutline } from "react-icons/io5";
import { cookies } from "next/headers";
import { sessionValid } from "@/utils/session/sessionValid";

function SearchForm() {
  const router = useRouter();
  // const session = sessionValid();
  // console.log(sessionValid());

  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
    {
      /* API 통신 필요*/
    }
  };

  const handleSaveToLocalStorage = () => {
    // 로컬 스토리지에서 검색 기록 가져오기
    const storedSearchHistory: string | null =
      localStorage.getItem("searchHistory");
    const previousSearchHistory: string[] = storedSearchHistory
      ? JSON.parse(storedSearchHistory)
      : [];

    // 현재 검색어를 검색 기록에 추가
    const newSearchHistory: string[] = [searchText, ...previousSearchHistory];

    // 상태 업데이트
    setSearchHistory(newSearchHistory);

    // 로컬 스토리지에 검색 기록 저장
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));

    console.log("검색어가 로컬 스토리지에 저장되었습니다:", searchText);

    // 추가 작업: 페이지 이동 및 검색어 저장
    router.push(`/auction/${searchText}`);
  };

  return (
    <>
      <form className="relative w-full" style={{ width: "75%" }}>
        <input
          type="text"
          className={styles["input-custom"]}
          placeholder="원하시는 경매를 검색해보세요."
          value={searchText}
          onChange={handleInputChange}
        />
        <div
          className='"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'
          // style={{ background: "red" }}
          onClick={handleSaveToLocalStorage}
        >
          <IoSearchOutline />
        </div>
      </form>
      {searchText.trim() !== "" && (
        <SearchList
          // authorization={authorization}
          // uuid={uuid}
          searchText={searchText}
        />
      )}
    </>
  );
}

export default SearchForm;
