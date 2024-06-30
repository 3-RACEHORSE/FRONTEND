"use client";

import React, { ChangeEvent } from "react";
import InputWithButtonOne from "../../molecules/InputWithButtonOne";
import Text from "../../atoms/Text/InfoText";
import AuthWithText from "@/components/molecules/AuthWithText";
import SendBtn from "@/components/atoms/button/SendBtn";
import SendBtnInValid from "@/components/atoms/button/SendBtnInValid";
import { useRouter } from "next/navigation";
import useJoinHook from "@/hooks/join/useJoinHook";
import useLoginValidation from "@/hooks/join/useJoinValidation";
import { handleSendPhoneNum } from "@/utils/join/handleSendPhoneNum";
import { handleSendVertifyNum } from "@/utils/join/handleSendVertifyNum";
import BackHeader from "@/components/organism/layout/BackHeader";
import { postSubmitJoin } from "@/apis/postSubmitJoin";

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
  //리다이렉션
  const router = useRouter();
  //커스텀 훅
  const {
    inputValueOne,
    setInputValueOne,
    checkValid1,
    setCheckValid1,
    inputValueTwo,
    setInputValueTwo,
    checkValid2,
    setCheckValid2,
  } = useJoinHook();

  // 로그인 or 회원가입 유효성 검사 api => useEffect로 자동 실행
  const loading = useLoginValidation(email, snsType, snsId);

  //가입하기
  const handleJoinClick = async () => {
    postSubmitJoin(snsId, snsType, email, name, inputValueOne, router);
  };

  //input 값 추적 - 전화번호
  const handleChangeOne = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueOne(event.target.value);
  };

  //input 값 추적 - 인증번호
  const handleChangeTwo = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueTwo(event.target.value);
  };

  if (loading) {
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#E85175",
          paddingBottom: "10vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      <BackHeader title="회원가입" />
      <div>
        <AuthWithText title="아이디(이메일)" value={email} />
      </div>
      <div>
        <AuthWithText title="이름" value={name} />
      </div>

      {/* 전화번호 */}
      <Text title="전화번호" />
      <div>
        <InputWithButtonOne
          value={inputValueOne}
          onChange={handleChangeOne}
          onClick={() =>
            handleSendPhoneNum(inputValueOne, setCheckValid1, checkValid1)
          }
          buttonText="전송"
        />
      </div>

      {/* 인증 */}
      {checkValid1 && (
        <>
          <Text title="인증" />
          <div>
            <InputWithButtonOne
              value={inputValueTwo}
              onChange={handleChangeTwo}
              onClick={() =>
                handleSendVertifyNum(
                  inputValueOne,
                  inputValueTwo,
                  setCheckValid2,
                  checkValid2
                )
              }
              buttonText="전송"
            />
          </div>
        </>
      )}

      {/* 로그인 버튼 유효*/}
      {checkValid2 ? (
        <SendBtn onClick={handleJoinClick} buttonText="가입하기" />
      ) : (
        <SendBtnInValid buttonText="가입하기" />
      )}
    </>
  );
}
