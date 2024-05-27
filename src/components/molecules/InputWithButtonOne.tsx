"use client";

import React, { ChangeEvent } from "react";
import JoinInput from "../atoms/input/JoinInput";
import CertificationBtn from "../atoms/button/CertificationBtn";

interface InputWithButtonProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  buttonText?: string;
  type?: boolean;
}

export default function InputWithButtonOne({
  value,
  onChange,
  onClick,
  buttonText,
  type,
}: InputWithButtonProps) {
  return (
    <div>
      <JoinInput
        style={type ? { width: "100%" } : undefined}
        value={value}
        onChange={onChange}
      />
      {!type && (
        <CertificationBtn onClick={onClick}>{buttonText}</CertificationBtn>
      )}
    </div>
  );
}
