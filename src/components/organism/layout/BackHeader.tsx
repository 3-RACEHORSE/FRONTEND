"use client";

import { useState } from "react";
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
  authorization?: any;
  uuid?: any;
}

export default function BackHeader({
  title,
  thumbnail,
  type,
  authorization,
  uuid,
}: TextProps) {
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

  const handleBackinChatRoom = async () => {
    console.log(authorization, uuid, pathName);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/leaveChatRoom`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${authorization}`,
          },
          body: JSON.stringify({
            roomNumber: "3ee5670d-de8b-48d0-be86-c52f6e922b00",
            uuid: uuid,
          }),
        }
      );

      if (response.ok) {
        console.log(response.status);
        router.back();
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const backHeaderContainer =
    type === "auction"
      ? `${styles["back-header-container"]} ${styles["no-background"]}`
      : styles["back-header-container"];

  const [isBannerClicked, setIsBannerClicked] = useState(false);

  const handleBannerClick = () => {
    setIsBannerClicked(!isBannerClicked);
    console.log("나옴");
  };
  return (
    <>
      <header className={styles["back-header-layout"]}>
        <div className={backHeaderContainer}>
          {type !== "chatroom" && <BackBtn onClick={handleBack} />}
          {type === "chatroom" && <BackBtn onClick={handleBackinChatRoom} />}

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
                onClick={handleBannerClick}
              />
            </div>
          )}
          {type !== "chatroom" && <Gap width={30} height={30} />}
        </div>
        {isBannerClicked && (
          <div className={styles["slide-out-background"]}>
            <div className={styles["slide-out-div"]}></div>
          </div>
        )}
      </header>
    </>
  );
}
