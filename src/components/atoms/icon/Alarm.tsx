"use client";

import React from "react";
import { GoBell } from "react-icons/go";

import Link from "next/link";

export default function Alarm() {
  return (
    <Link href={"/"}>
      <GoBell size={27} color="#000000" />
    </Link>
  );
}
