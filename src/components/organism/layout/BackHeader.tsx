"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/layout/header.module.scss";
import BackBtn from "@/components/atoms/button/BackBtn";
import TitleText from "@/components/atoms/Text/TitleText";
import Gap from "@/components/atoms/etc/Gap";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useDarkMode } from "@/hooks/system/checkDarkMode";
import putLeaveChatRoom from "@/apis/putLeaveChatRoom";
import getChatRoomMember from "@/apis/getChatRoomMember";
import { MemberInfo } from "@/interface/MemberInfo";
import { BackHeaderProps } from "@/interface/BackHeaderProps";

export default function BackHeader({
  title,
  thumbnail,
  type,
  authorization,
  uuid,
}: BackHeaderProps) {
  const [members, setMembers] = useState<MemberInfo[]>([]);

  useDarkMode();
  const router = useRouter();
  const pathName = usePathname();
  const roomNumber = pathName.replace("/chatRoom/", "");

  // 분기처리
  const handleBack = () => {
    if (pathName === "/join") {
      router.push("/");
    } else {
      router.back();
    }
  };

  //채팅방 나가는 api 함수 호출
  const handleBackinChatRoom = async () => {
    const success = await putLeaveChatRoom(authorization, uuid, roomNumber);
    if (success) {
      router.back();
    }
  };

  const backHeaderContainer =
    type === "auction"
      ? `${styles["back-header-container"]} ${styles["no-background"]}`
      : styles["back-header-container"];

  // 채팅방 헤더, 토글 관리
  const [isBannerClicked, setIsBannerClicked] = useState(false);

  const handleBannerClick = (e: any) => {
    setIsBannerClicked(!isBannerClicked);
  };

  //참여하는 사람들 체크
  const fetchInitialData = async () => {
    const members = await getChatRoomMember(authorization, uuid, roomNumber);
    setMembers(members);
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
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
