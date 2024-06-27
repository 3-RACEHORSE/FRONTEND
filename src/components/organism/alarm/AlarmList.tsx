"use client";

import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { IoSearchOutline } from "react-icons/io5";
import Logo from "@/asset/svgs/Logo";
import { GoBell } from "react-icons/go";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { sessionValid } from "@/utils/session/sessionValid";
import path from "path";
import styles from "@/styles/alarm/alarm.module.scss";
import AlarmLogo from "@/asset/svgs/AlarmLogo";

interface AlarmListProps {
  eventType: any;
  alarmUrl: any;
  message: any;
}

export default function AlarmList({
  eventType,
  alarmUrl,
  message,
}: AlarmListProps) {
  return (
    <>
      <div
        style={{
          background: "#f3f3f3",
          padding: "3%",
          borderRadius: "7px",
          display: "flex",
        }}
      >
        <AlarmLogo />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: "19px",
              fontWeight: "bold",
            }}
          >
            경매 낙찰 알림!
          </p>
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}
