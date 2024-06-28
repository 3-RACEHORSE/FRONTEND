"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/layout/header.module.scss";
import BackBtn from "@/components/atoms/button/BackBtn";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/hooks/common/checkDarkMode";
import { IoMdArrowRoundBack } from "react-icons/io";

interface TextProps {
  title: string;
  thumbnail?: any;
  type?: any;
  authorization?: any;
  uuid?: any;
}

interface MemberInfo {
  memberUuid: any;
  profileImage: any;
  handle: any;
}

export default function BackHeader({
  title,
  thumbnail,
  type,
  authorization,
  uuid,
}: TextProps) {
  const [members, setMembers] = useState<MemberInfo[]>([]);

  useDarkMode();
  const router = useRouter();
  const pathName = usePathname();
  const roomNumber = pathName.replace("/chatRoom/", "");
  const handleBack = () => {
    if (pathName === "/join") {
      router.push("/");
    } else {
      router.back();
    }
  };

  const handleBackinChatRoom = async () => {
    console.log(authorization, uuid, roomNumber);
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
            roomNumber: roomNumber,
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

  const handleBannerClick = (e: any) => {
    setIsBannerClicked(!isBannerClicked);
    console.log("나옴");
  };

  const fetchInitialData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/chat-service/api/v1/authorization/chat/roomNumber/${roomNumber}/member`,
        {
          headers: {
            Authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMembers(data);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

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
          <div
            className={styles["slide-out-background"]}
            onClick={handleBannerClick}
          >
            <div className={styles["slide-out-div"]}>
              <div className={styles["slide-header"]}>
                <p>참여중인 사람 {members.length}명</p>
              </div>

              <div className={styles["slide-info"]}>
                {members.map((member) => (
                  <div
                    className={styles["slide-info-element"]}
                    key={member.memberUuid}
                  >
                    <img src={member.profileImage} alt={member.handle} />
                    <p>{member.handle}</p>
                  </div>
                ))}
                {/* <img src={member.profileImage} />
                <p>{member.handle}</p> */}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
