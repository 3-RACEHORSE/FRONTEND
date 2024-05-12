"use client";

import React, { useState, ChangeEvent } from "react";
import InputWithButtonOne from "../../molecules/InputWithButtonOne";
import Text from "../../atoms/Text/InfoText";
import styles from "@/styles/organism/joinInfoOne.module.scss";
import AuthWithText from "@/components/molecules/AuthWithText";

export default function DataFetcher() {
  const [inputValueOne, setInputValueOne] = useState<string>("");
  const [inputValueTwo, setInputValueTwo] = useState<string>("");

  const [data, setData] = useState<any>(null);

  const handleChangeOne = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueOne(event.target.value);
  };

  const handleChangeTwo = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueTwo(event.target.value);
  };

  const fetchData = () => {
    // 이 부분에 API 호출 로직
    console.log(inputValueOne, inputValueTwo);
  };

  return (
    <>
      <div>
        <AuthWithText title="아이디(이메일)" value="값" />
      </div>
      <div>
        <AuthWithText title="이름" value="값" />
      </div>
      <Text title="전화번호" />
      <div>
        <InputWithButtonOne
          value={inputValueOne}
          onChange={handleChangeOne}
          onClick={fetchData}
          buttonText="전송"
        />
        {data && <div>{JSON.stringify(data)}</div>}
      </div>
      <Text title="인증" />
      <div>
        <InputWithButtonOne
          value={inputValueTwo}
          onChange={handleChangeTwo}
          onClick={fetchData}
          buttonText="전송"
        />
        {data && <div>{JSON.stringify(data)}</div>}
      </div>
    </>
  );
}
