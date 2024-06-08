"use client";

import { usePathname } from "next/navigation";
import styles from "@/styles/layout/nav.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import TMy from "@/components/atoms/icon/true/TMy";
import FMy from "@/components/atoms/icon/false/FMy";

// Dynamic import for icons
const FHome = dynamic(() => import("@/components/atoms/icon/false/FHome"));
const FList = dynamic(() => import("@/components/atoms/icon/false/FList"));
const FChat = dynamic(() => import("@/components/atoms/icon/false/FChat"));
const THome = dynamic(() => import("@/components/atoms/icon/true/THome"));
const TList = dynamic(() => import("@/components/atoms/icon/true/TList"));

export default function NavBar() {
  const pathNmae = usePathname();
  // console.log("pathNmae", pathNmae);

  return (
    <>
      <div
        style={{
          position: "fixed",
          background: "linear-gradient(to top, black 60%, transparent)",
          height: "25vh",
          width: "100%",
          bottom: "0",
          left: "0",
        }}
      ></div>
      <nav className={styles["nav-main-container"]}>
        {/* 버튼1 */}
        <Link href="/">
          <div className={styles["nav-iconWithText-container"]}>
            {pathNmae === "/" ? (
              <>
                <THome />
                <div className={styles["nav-iconWithText-container-text-true"]}>
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
        <Link href="/auction/all">
          <div className={styles["nav-iconWithText-container"]}>
            {pathNmae.startsWith("/auction") ? (
              <>
                <TList />
                <div className={styles["nav-iconWithText-container-text-true"]}>
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

        {/* 버튼4 */}
        <div className={styles["nav-iconWithText-container"]}>
          <FChat />
          <div className={styles["nav-iconWithText-container-text"]}>CHAT</div>
        </div>

        <Link href="/mypage">
          <div className={styles["nav-iconWithText-container"]}>
            {pathNmae === "/mypage" ? (
              <>
                <TMy />
                <div className={styles["nav-iconWithText-container-text-true"]}>
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
