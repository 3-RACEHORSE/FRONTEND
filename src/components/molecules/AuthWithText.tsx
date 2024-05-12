"use client";

import React, { ChangeEvent } from "react";
import AuthText from "../atoms/Text/AuthText";
import Text from "@/components/atoms/Text/InfoText";

interface InputWithTextnProps {
  title: string;
  value: string;
}

export default function InputWithText({ title, value }: InputWithTextnProps) {
  return (
    <div>
      <Text title={title} />
      <AuthText value={value} />
    </div>
  );
}
