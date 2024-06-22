"use client";

import styles from "@/styles/layout/header.module.scss";
import BackBtn from "@/components/atoms/button/BackBtn";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/hooks/common/checkDarkMode";

interface TextProps {
  title: string;
  thumbnail?: any;
  type?: any;
}

export default function BackHeader({ title, thumbnail, type }: TextProps) {
  useDarkMode();
  const router = useRouter();
  const pathName = usePathname();
  const handleBack = () => {
    if (pathName === "/join") {
      router.push("/");
    } else {
      router.back();
    }
  };
  const backHeaderContainer =
    type === "auction"
      ? `${styles["back-header-container"]} ${styles["no-background"]}`
      : styles["back-header-container"];
  return (
    <>
      <header className={styles["back-header-layout"]}>
        <div className={backHeaderContainer}>
          <BackBtn onClick={handleBack} />

          <TitleText title={title} />

          {type === "chatroom" && (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={thumbnail}
                style={{ height: "30px", width: "30px", borderRadius: "999px" }}
              />
            </div>
          )}
          {type !== "chatroom" && <Gap width={30} height={30} />}
        </div>
      </header>
    </>
  );
}
