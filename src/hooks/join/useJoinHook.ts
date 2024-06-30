"use client";

import { useState } from "react";
import watchListData from "@/constants/watchListData";

const useJoinHook = () => {
  //이름
  const [inputNameValue, setInputNameValue] = useState<string>("");

  //핸들
  const [inputHandleValue, setInputHandleValue] = useState<string>("");

  //전화인증
  const [inputValueOne, setInputValueOne] = useState<string>("");
  const [checkValid1, setCheckValid1] = useState<boolean>(false);

  //인증코드
  const [inputValueTwo, setInputValueTwo] = useState<string>("");
  const [checkValid2, setCheckValid2] = useState<boolean>(false);

  //더미 추후 삭제 필요
  const [apple, setApple] = useState<{ [index: number]: string }[]>([]);
  const [buttonStates, setButtonStates] = useState(watchListData);

  return {
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
    apple,
    setApple,
    buttonStates,
    setButtonStates,
  };
};

export default useJoinHook;
