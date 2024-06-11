"use client";

import { usePathname } from "next/navigation";
import styles from "@/styles/layout/nav.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import TMy from "@/components/atoms/icon/true/TMy";
import FMy from "@/components/atoms/icon/false/FMy";
import TChat from "@/components/atoms/icon/true/TChat";
import { useDarkMode } from "@/hooks/common/checkDarkMode";

// Dynamic import for icons
const FHome = dynamic(() => import("@/components/atoms/icon/false/FHome"));
const FList = dynamic(() => import("@/components/atoms/icon/false/FList"));
const FChat = dynamic(() => import("@/components/atoms/icon/false/FChat"));
const THome = dynamic(() => import("@/components/atoms/icon/true/THome"));
const TList = dynamic(() => import("@/components/atoms/icon/true/TList"));

export default function HomeNavBar() {
  const pathName = usePathname();

  //다크모드
  const isDarkMode = useDarkMode();
  console.log("nav에서 통제하는 ", isDarkMode, "입니다.");

  return (
    <>
      <div className={styles["home-effect"]}></div>
      <nav className={styles["nav-main-container"]}>
        {" "}
        {/* 버튼1 */}
        <Link href="/">
          <div className={styles["nav-iconWithText-container"]}>
            <THome />
            <div className={styles["nav-iconWithText-container-text"]}>
              HOME
            </div>
          </div>
        </Link>
        {/* 버튼2 */}
        <Link href="/auction/all">
          <div className={styles["nav-iconWithText-container"]}>
            <FList />
            <div className={styles["nav-iconWithText-container-text"]}>
              AUCTION
            </div>
          </div>
        </Link>
        {/* 버튼3 */}
        <Link href="/chat">
          <div className={styles["nav-iconWithText-container"]}>
            <FChat />
            <div className={styles["nav-iconWithText-container-text"]}>
              CHAT
            </div>
          </div>
        </Link>
        {/* 버튼4 */}
        <Link href="/mypage">
          <div className={styles["nav-iconWithText-container"]}>
            <FMy />
            <div className={styles["nav-iconWithText-container-text"]}>MY</div>
          </div>
        </Link>
      </nav>
    </>
  );
}
