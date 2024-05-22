"use client";

import React, { useState } from "react";
import SearchList from "./SearchList";

function SearchForm() {
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
    // 현재 검색어를 검색 기록에 추가
    const newSearchHistory = [searchText, ...searchHistory]; // 배열의 앞쪽에 저장
    setSearchHistory(newSearchHistory);

    // 로컬 스토리지에 검색 기록 저장
    localStorage.setItem("searchHistory", JSON.stringify(newSearchHistory));

    console.log("검색어가 로컬 스토리지에 저장되었습니다:", searchText);
  };

  return (
    <>
      <form className="relative w-full" style={{ width: "75%" }}>
        <input
          type="text"
          className="h-[40px] w-full rounded-full bg-[#F5F5F5] p-[10px]"
          placeholder="원하시는 상품을 검색해보세요."
          style={{ fontSize: "13px" }}
          value={searchText}
          onChange={handleInputChange}
        />
        <div
          className='"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'
          // style={{background:'red'}}
          onClick={handleSaveToLocalStorage}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.60004 14.8C7.60004 18.76 10.84 22 14.8 22C18.76 22 22 18.76 22 14.8C22 10.84 18.76 7.60001 14.8 7.60001C10.84 7.60001 7.60004 10.84 7.60004 14.8ZM8.80007 14.8C8.80007 11.44 11.4401 8.80001 14.8001 8.80001C18.1601 8.80001 20.8001 11.44 20.8001 14.8C20.8001 18.16 18.1601 20.8 14.8001 20.8C11.4401 20.8 8.80007 18.16 8.80007 14.8Z"
              fill="black"
            />
            <path
              d="M19.0187 19.8562L19.8672 19.0077L25.3826 24.5231L24.5341 25.3716L19.0187 19.8562Z"
              fill="black"
            />
          </svg>
        </div>
      </form>
      {searchText.trim() !== "" && <SearchList />}
    </>
  );
}

export default SearchForm;
