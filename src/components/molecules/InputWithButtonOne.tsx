"use client";

import React, { ChangeEvent } from "react";
import JoinInput from "../atoms/input/JoinInput";
import CertificationBtn from "../atoms/button/CertificationBtn";

interface InputWithButtonProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  buttonText: string;
}

export default function InputWithButtonOne({
  value,
  onChange,
  onClick,
  buttonText,
}: InputWithButtonProps) {
  return (
    <div>
      <JoinInput value={value} onChange={onChange} />
      <CertificationBtn onClick={onClick}>{buttonText}</CertificationBtn>
    </div>
  );
}
