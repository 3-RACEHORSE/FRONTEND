"use client";

import styles from "@/styles/organism/myPageUserInfo.module.scss";
import Text from "@/components/atoms/Text/InfoText";
import InputWithButtonOne from "@/components/molecules/InputWithButtonOne";
import { handleSendPhoneNum } from "@/utils/join/handleSendPhoneNum";
import useJoinHook from "@/hooks/join/useJoinHook";
import { ChangeEvent, useEffect } from "react";
import { handleSendVertifyNum } from "@/utils/join/handleSendVertifyNum";
import SendBtn from "@/components/atoms/button/SendBtn";
import SendBtnInValid from "@/components/atoms/button/SendBtnInValid";
import { useRouter } from "next/navigation";
import { handleEditMyInfo } from "@/utils/info/handleEditMyInfo";
interface MypageUserInfoProps {
  src?: string;
  name?: string;
  handle?: string;
  phoneNum?: string;
  authorization?: any;
  uuid?: any;
}

export default function MyPageUserInfo({
  src,
  name = "",
  handle = "",
  phoneNum = "",
  authorization,
  uuid,
}: MypageUserInfoProps) {
  const router = useRouter();
  const initPhoneNum = phoneNum;

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

  useEffect(() => {
    setInputNameValue(name);
    setInputHandleValue(handle);
    setInputValueOne(phoneNum);
  }, []);

  //이름
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNameValue(event.target.value);
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
    await handleEditMyInfo(
      authorization,
      uuid,
      inputNameValue,
      inputValueOne,
      src,
      router
    );
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

      {initPhoneNum === inputValueOne || checkValid2 ? (
        <SendBtn onClick={handleEditClick} buttonText="수정하기" />
      ) : (
        <SendBtnInValid buttonText="수정하기" />
      )}
    </main>
  );
}
