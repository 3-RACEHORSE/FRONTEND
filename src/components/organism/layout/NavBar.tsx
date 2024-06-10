"use client";

import { usePathname } from "next/navigation";
import styles from "@/styles/layout/nav.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";
import TMy from "@/components/atoms/icon/true/TMy";
import FMy from "@/components/atoms/icon/false/FMy";
import TChat from "@/components/atoms/icon/true/TChat";

// Dynamic import for icons
const FHome = dynamic(() => import("@/components/atoms/icon/false/FHome"));
const FList = dynamic(() => import("@/components/atoms/icon/false/FList"));
const FChat = dynamic(() => import("@/components/atoms/icon/false/FChat"));
const THome = dynamic(() => import("@/components/atoms/icon/true/THome"));
const TList = dynamic(() => import("@/components/atoms/icon/true/TList"));

export default function NavBar() {
  const pathName = usePathname();

  let color;
  let mainIconColor;
  if (pathName == "/") {
    mainIconColor = "white";
    color = "rgb(100, 100, 100)";
  } else color = "black";

  return (
    <>
      {pathName === "/" && (
        <div
          style={{
            position: "fixed",
            background: "linear-gradient(to top, black 50%, transparent)",
            height: "25vh",
            width: "100%",
            bottom: "0",
            left: "0",
          }}
        ></div>
      )}

      <nav
        className={
          pathName === "/"
            ? styles["nav-main-container1"]
            : styles["nav-main-container2"]
        }
      >
        {" "}
        {/* 버튼1 */}
        <Link href="/">
          <div className={styles["nav-iconWithText-container"]}>
            {pathName === "/" ? (
              <>
                <THome color={mainIconColor} />
                <div
                  className={
                    pathName === "/"
                      ? styles["nav-iconWithText-container-text-true-home"]
                      : styles["nav-iconWithText-container-text-true"]
                  }
                >
                  HOME
                </div>
              </>
            ) : (
              <>
                <FHome color={color} />
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
            {pathName.startsWith("/auction") ? (
              <>
                <TList color={color} />
                <div className={styles["nav-iconWithText-container-text-true"]}>
                  AUCTION
                </div>
              </>
            ) : (
              <>
                <FList color={color} />
                <div
                  className={
                    pathName === "/"
                      ? styles["nav-iconWithText-container-text-true-main"]
                      : styles["nav-iconWithText-container-text-true"]
                  }
                >
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
                <TChat color={color} />
                <div className={styles["nav-iconWithText-container-text-true"]}>
                  CHAT
                </div>
              </>
            ) : (
              <>
                <FChat color={color} />
                <div
                  className={
                    pathName === "/"
                      ? styles["nav-iconWithText-container-text-true-main"]
                      : styles["nav-iconWithText-container-text-true"]
                  }
                >
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
                <TMy color={color} />
                <div className={styles["nav-iconWithText-container-text-true"]}>
                  MY
                </div>
              </>
            ) : (
              <>
                <FMy color={color} />
                <div
                  className={
                    pathName === "/"
                      ? styles["nav-iconWithText-container-text-true-main"]
                      : styles["nav-iconWithText-container-text-true"]
                  }
                >
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
