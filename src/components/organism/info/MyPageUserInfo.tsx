"use client";

import AuthWithText from "@/components/molecules/AuthWithText";
import styles from "@/styles/organism/myPageUserInfo.module.scss";
import Text from "@/components/atoms/Text/InfoText";
import InputWithButtonOne from "@/components/molecules/InputWithButtonOne";
import { handleSendPhoneNum } from "@/utils/join/handleSendPhoneNum";
import useJoinHook from "@/hooks/join/useJoinHook";
import { ChangeEvent } from "react";
import { handleSendVertifyNum } from "@/utils/join/handleSendVertifyNum";
import SendBtn from "@/components/atoms/button/SendBtn";
import SendBtnInValid from "@/components/atoms/button/SendBtnInValid";

export default function MyPageUserInfo() {
  const {
    inputNameValue,
    setInputNameValue,
    inputHandleValue,
    setInputHandleValue,

    inputValueOne,
    setInputValueOne,
    checkValid1,
    setCheckValid1,
    inputValueTwo,
    setInputValueTwo,
    checkValid2,
    setCheckValid2,
  } = useJoinHook();

  //이름
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value);
  };

  //핸들
  const handleChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputHandleValue(event.target.value);
  };

  //번호
  const handleChangeOne = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueOne(event.target.value);
  };

  //인증코드
  const handleChangeTwo = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValueTwo(event.target.value);
  };

  //수정하기 api
  const handleEditClick = async () => {
    console.log(inputNameValue, inputHandleValue, inputValueOne, inputValueTwo);
  };

  return (
    <main className={styles["container"]}>
      {/* 이름 */}
      <Text title="이름" />
      <div>
        <InputWithButtonOne
          value={inputNameValue}
          onChange={handleChangeName}
          type={true}
        />
      </div>
      {/* 핸들 */}
      <Text title="핸들" />
      <div>
        <InputWithButtonOne
          value={inputHandleValue}
          onChange={handleChangeHandle}
          type={true}
        />
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
        <SendBtn onClick={handleEditClick} buttonText="수정하기" />
      ) : (
        <SendBtnInValid buttonText="수정하기" />
      )}
    </main>
  );
}
