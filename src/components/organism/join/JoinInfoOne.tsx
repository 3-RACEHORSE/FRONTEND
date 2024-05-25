"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import InputWithButtonOne from "../../molecules/InputWithButtonOne";
import Text from "../../atoms/Text/InfoText";
import AuthWithText from "@/components/molecules/AuthWithText";
import WatchList from "@/components/molecules/WatchList";
import watchListData from "@/constants/watchListData";
import SendBtn from "@/components/atoms/button/SendBtn";

interface DataFetcherProps {
  email: string;
  name: string;
  snsType: string;
  snsId: string;
}
export default function DataFetcher({
  email,
  name,
  snsType,
  snsId,
}: DataFetcherProps) {
  const [inputValueOne, setInputValueOne] = useState<string>("");
  const [inputValueTwo, setInputValueTwo] = useState<string>("");
  const [apple, setApple] = useState<{ [index: number]: string }[]>([]);
  const [buttonStates, setButtonStates] = useState(watchListData);

  const handleLoginValid = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/login`,
        {
          method: "POST", // 또는 "POST" 등 필요한 메서드로 변경
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            snsType: snsType,
            snsId: snsId,
          }),
        }
      );
      if (res.status === 200) {
        console.log("회원가입된 사람");
      }
    } catch (error) {
      console.error("API 통신 오류:", error);
      return false;
    }
  };

  useEffect(() => {
    handleLoginValid();
  }, []);

  //활성화된 버튼 체크 및 양식에 맞춰, 적용
  const handleToggle = (index: number) => {
    const updatedButtons = buttonStates.map((button, i) =>
      i === index ? { ...button, isActive: !button.isActive } : button
    );
    setButtonStates(updatedButtons);

    const activeButtons = updatedButtons.filter((button) => button.isActive);
    const formattedActiveButtons = activeButtons.reduce((acc, cur) => {
      acc[cur.index] = cur.label;
      return acc;
    }, {} as { [index: number]: string });
    setApple([formattedActiveButtons]);
  };

  //input 값 추적
  const handleChangeOne = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueOne(event.target.value);
  };

  const handleChangeTwo = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueTwo(event.target.value);
  };

  const fetchData = () => {
    // 이 부분에 API 호출 로직
    console.log(inputValueOne, inputValueTwo);
    console.log(apple);
  };

  return (
    <>
      <div>
        <AuthWithText title="아이디(이메일)" value={email} />
      </div>
      <div>
        <AuthWithText title="이름" value={name} />
      </div>
      <Text title="전화번호" />
      <div>
        <InputWithButtonOne
          value={inputValueOne}
          onChange={handleChangeOne}
          onClick={fetchData}
          buttonText="전송"
        />
      </div>
      <Text title="인증" />
      <div>
        <InputWithButtonOne
          value={inputValueTwo}
          onChange={handleChangeTwo}
          onClick={fetchData}
          buttonText="전송"
        />
      </div>

      {/* 관심목록 */}
      <Text title="관심목록을 선택해주세요🙌" />
      <WatchList buttons={buttonStates} onClick={handleToggle} />
      <SendBtn onClick={fetchData} buttonText="가입하기" />
    </>
  );
}
