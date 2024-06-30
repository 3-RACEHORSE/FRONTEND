"use client";

import styles from "@/styles/layout/header.module.scss";
import { usePathname } from "next/navigation";
import AlarmConnect from "@/components/organism/alarm/AlarmConnect";

export default function Header() {
  const pathName = usePathname();
  console.log("pathNmae", pathName);
  return (
    <header className={styles["main-header-layout"]}>
      <div className={styles["main-header-container"]}>
        <AlarmConnect />
      </div>
    </header>
  );
}
