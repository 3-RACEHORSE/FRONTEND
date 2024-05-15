"use client";

import { usePathname } from "next/navigation";
import styles from "@/styles/layout/nav.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";

// Dynamic import for icons
const FHome = dynamic(() => import("@/components/atoms/icon/false/FHome"));
const FList = dynamic(() => import("@/components/atoms/icon/false/FList"));
const FSaved = dynamic(() => import("@/components/atoms/icon/false/FSaved"));
const FChat = dynamic(() => import("@/components/atoms/icon/false/FChat"));
const FMy = dynamic(() => import("@/components/atoms/icon/false/FMy"));
const THome = dynamic(() => import("@/components/atoms/icon/true/THome"));
const TList = dynamic(() => import("@/components/atoms/icon/true/TList"));

export default function NavBar() {
  const pathNmae = usePathname();
  console.log("pathNmae", pathNmae);

  return (
    <>
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
            {pathNmae === "/auction/all" ? (
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

        {/* 버튼3 */}
        <div className={styles["nav-iconWithText-container"]}>
          <FSaved />
          <div className={styles["nav-iconWithText-container-text"]}>SAVED</div>
        </div>

        {/* 버튼4 */}
        <div className={styles["nav-iconWithText-container"]}>
          <FChat />
          <div className={styles["nav-iconWithText-container-text"]}>CHAT</div>
        </div>

        {/* 버튼5 */}
        <div className={styles["nav-iconWithText-container"]}>
          <FMy />
          <div className={styles["nav-iconWithText-container-text"]}>MY</div>
        </div>
      </nav>
    </>
  );
}
