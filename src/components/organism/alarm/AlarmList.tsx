"use client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { IoSearchOutline } from "react-icons/io5";
import styles from "@/styles/layout/header.module.scss";
import Logo from "@/asset/svgs/Logo";
import { GoBell } from "react-icons/go";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { sessionValid } from "@/utils/session/sessionValid";
import path from "path";

export default function AlarmList() {
  return <>알람</>;
}
