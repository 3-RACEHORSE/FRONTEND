"use client";

import React, { ChangeEvent } from "react";
import SearchInput from "../atoms/input/SearchInput";
import Alarm from "../atoms/icon/Alarm";

export default function SearchWithAlarm() {
  return (
    <>
      <SearchInput />
      <Alarm />
    </>
  );
}
