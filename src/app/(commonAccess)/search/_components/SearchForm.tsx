"use client";

import React, { useState } from "react";
import SearchList from "./SearchList";
import { useRouter } from "next/navigation";
import styles from "@/styles/organism/search.module.scss";
import { IoSearchOutline } from "react-icons/io5";
import { handleSaveToLocalStorage } from "@/utils/search/handleSaveToLocalStorage";

function SearchForm() {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
  };

  const onSaveToLocalStorage = () => {
    handleSaveToLocalStorage(searchText, setSearchHistory, router);
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
          onClick={onSaveToLocalStorage}
        >
          <IoSearchOutline />
        </div>
      </form>
      {searchText.trim() !== "" && <SearchList searchText={searchText} />}
    </>
  );
}

export default SearchForm;
