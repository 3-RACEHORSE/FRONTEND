"use client";

import AuthWithText from "@/components/molecules/AuthWithText";
import styles from "@/styles/organism/myPageUserInfo.module.scss";
import Text from "@/components/atoms/Text/InfoText";
import InputWithButtonOne from "@/components/molecules/InputWithButtonOne";
import { handleSendPhoneNum } from "@/utils/join/handleSendPhoneNum";
import useJoinHook from "@/hooks/join/useJoinHook";
import { ChangeEvent, useEffect, useState } from "react";
import { handleSendVertifyNum } from "@/utils/join/handleSendVertifyNum";
import SendBtn from "@/components/atoms/button/SendBtn";
import SendBtnInValid from "@/components/atoms/button/SendBtnInValid";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { handleEditMyInfo } from "@/utils/info/handleEditMyInfo";
import { handleImageUpload } from "@/utils/write/imageHandlers";

interface ImageData {
  src: string;
  croppedSrc: string | null;
}

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
    await handleEditMyInfo(
      authorization,
      uuid,
      inputNameValue,
      inputHandleValue,
      inputValueOne,
      router
    );
  };

  const [images, setImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

      {initPhoneNum === inputValueOne || checkValid2 ? (
        <SendBtn onClick={handleEditClick} buttonText="수정하기" />
      ) : (
        <SendBtnInValid buttonText="수정하기" />
      )}
    </main>
  );
}
