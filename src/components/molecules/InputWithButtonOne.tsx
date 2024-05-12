"use client";

import React, { ChangeEvent } from "react";
import JoinInput from "../atoms/input/JoinInput";
import Button from "../atoms/button/CertificationBtn";

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
      <Button onClick={onClick}>{buttonText}</Button>
    </div>
  );
}
