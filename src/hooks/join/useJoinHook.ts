"use client";

import { useState } from "react";
import watchListData from "@/constants/watchListData";

const useJoinHook = () => {
  const [inputValueOne, setInputValueOne] = useState<string>("");
  const [checkValid1, setCheckValid1] = useState<boolean>(false);

  const [inputValueTwo, setInputValueTwo] = useState<string>("");
  const [checkValid2, setCheckValid2] = useState<boolean>(false);

  const [apple, setApple] = useState<{ [index: number]: string }[]>([]);
  const [buttonStates, setButtonStates] = useState(watchListData);

  return {
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
