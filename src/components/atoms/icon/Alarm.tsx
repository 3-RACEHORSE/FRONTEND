"use client";

import React from "react";
import { FaBell } from "react-icons/fa";

import Link from "next/link";

export default function Alarm() {
  return (
    <Link href={"/"}>
      <FaBell size={27} />
    </Link>
  );
}
