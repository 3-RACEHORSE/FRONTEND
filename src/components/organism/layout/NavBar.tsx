"use client";

import { usePathname } from "next/navigation";
import styles from "@/styles/layout/nav.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useDarkMode } from "@/hooks/system/checkDarkMode";

const THome = dynamic(() => import("@/components/atoms/icon/true/THome"));
const FHome = dynamic(() => import("@/components/atoms/icon/false/FHome"));
const TList = dynamic(() => import("@/components/atoms/icon/true/TList"));
const FList = dynamic(() => import("@/components/atoms/icon/false/FList"));
const TChat = dynamic(() => import("@/components/atoms/icon/true/TChat"));
const FChat = dynamic(() => import("@/components/atoms/icon/false/FChat"));
const TMy = dynamic(() => import("@/components/atoms/icon/true/TMy"));
const FMy = dynamic(() => import("@/components/atoms/icon/false/FMy"));

export default function NavBar() {
  const pathName = usePathname();

  //다크모드
  const isDarkMode = useDarkMode();

  return (
    <>
      <nav className={styles["nav-main-container"]}>
        {" "}
        {/* 버튼1 */}
        <Link href="/">
          <div className={styles["nav-iconWithText-container"]}>
            {pathName === "/" ? (
              <>
                <THome />
                <div className={styles["nav-iconWithText-container-text"]}>
                  HOME
                </div>
              </>
            ) : (
              <>
                <FHome />
                <div className={styles["nav-iconWithText-container-text"]}>
                  HOME
                </div>
              </>
            )}
          </div>
        </Link>
        {/* 버튼2 */}
        <Link href="/auction/progress">
          <div className={styles["nav-iconWithText-container"]}>
            {pathName.startsWith("/auction") ? (
              <>
                <TList />
                <div className={styles["nav-iconWithText-container-text"]}>
                  AUCTION
                </div>
              </>
            ) : (
              <>
                <FList />
                <div className={styles["nav-iconWithText-container-text"]}>
                  AUCTION
                </div>
              </>
            )}
          </div>
        </Link>
        {/* 버튼3 */}
        <Link href="/chat">
          <div className={styles["nav-iconWithText-container"]}>
            {pathName === "/chat" ? (
              <>
                <TChat />
                <div className={styles["nav-iconWithText-container-text"]}>
                  CHAT
                </div>
              </>
            ) : (
              <>
                <FChat />
                <div className={styles["nav-iconWithText-container-text"]}>
                  CHAT
                </div>
              </>
            )}
          </div>
        </Link>
        {/* 버튼4 */}
        <Link href="/mypage">
          <div className={styles["nav-iconWithText-container"]}>
            {pathName === "/mypage" ? (
              <>
                <TMy />
                <div className={styles["nav-iconWithText-container-text"]}>
                  MY
                </div>
              </>
            ) : (
              <>
                <FMy />
                <div className={styles["nav-iconWithText-container-text"]}>
                  MY
                </div>
              </>
            )}
          </div>
        </Link>
      </nav>
    </>
  );
}
