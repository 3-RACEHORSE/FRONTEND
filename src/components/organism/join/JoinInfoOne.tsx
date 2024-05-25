"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import InputWithButtonOne from "../../molecules/InputWithButtonOne";
import Text from "../../atoms/Text/InfoText";
import AuthWithText from "@/components/molecules/AuthWithText";
import WatchList from "@/components/molecules/WatchList";
import watchListData from "@/constants/watchListData";
import SendBtn from "@/components/atoms/button/SendBtn";
import SendBtnInValid from "@/components/atoms/button/SendBtnInValid";

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
  const [checkValid1, setCheckValid1] = useState<boolean>(false);

  const [inputValueTwo, setInputValueTwo] = useState<string>("");
  const [checkValid2, setCheckValid2] = useState<boolean>(false);

  const [apple, setApple] = useState<{ [index: number]: string }[]>([]);
  const [buttonStates, setButtonStates] = useState(watchListData);

  // 로그인 유효성 검사 api
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

  // 전화번호 전송 api
  const handleSendPhoneNum = async () => {
    console.log(inputValueOne);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/certify`,
        {
          method: "POST", // 또는 "POST" 등 필요한 메서드로 변경
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNum: inputValueOne,
          }),
        }
      );

      if (res.status === 200) {
        console.log("전화 인증 완료");
        setCheckValid1(!checkValid1);
      }
    } catch (error) {
      console.error("API 통신 오류:", error);
      return false;
    }
  };
  //인증번호 전송 api
  const handleSendVertifyNum = async () => {
    console.log(inputValueTwo);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/verify`,
        {
          method: "POST", // 또는 "POST" 등 필요한 메서드로 변경
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNum: inputValueOne,
            verificationCode: inputValueTwo,
          }),
        }
      );

      if (res.status === 200) {
        console.log("코드 인증 완료");
        setCheckValid2(!checkValid2);
      }
    } catch (error) {
      console.error("API 통신 오류:", error);
      return false;
    }
  };
  //가입하기
  const handleJoin = async () => {
    // 이 부분에 API 호출 로직
    console.log(snsId, snsType, email, name, inputValueOne, apple);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/non-authorization/users/signup`,
        {
          method: "POST", // 또는 "POST" 등 필요한 메서드로 변경
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            snsId: snsId,
            snsType: snsType,
            email: email,
            name: name,
            phoneNum: inputValueOne,
            interestCategories: apple,
          }),
        }
      );

      if (res.status === 200) {
        console.log("회원가입 완료");
      }
    } catch (error) {
      console.error("API 통신 오류:", error);
      return false;
    }
  };

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
          onClick={handleSendPhoneNum}
          buttonText="전송"
        />
      </div>
      {checkValid1 && (
        <>
          <Text title="인증" />
          <div>
            <InputWithButtonOne
              value={inputValueTwo}
              onChange={handleChangeTwo}
              onClick={handleSendVertifyNum}
              buttonText="전송"
            />
          </div>
        </>
      )}

      {/* 관심목록 */}
      <Text title="관심목록을 선택해주세요🙌" />
      <WatchList buttons={buttonStates} onClick={handleToggle} />

      {Object.keys(apple[0] || {}).length !== 0 && checkValid2 ? (
        <SendBtn onClick={handleJoin} buttonText="가입하기" />
      ) : (
        <SendBtnInValid buttonText="가입하기" />
      )}
    </>
  );
}
