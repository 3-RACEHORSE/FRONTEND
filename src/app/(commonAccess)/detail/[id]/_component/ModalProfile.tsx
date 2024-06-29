"use client";

import Footer from "@/components/organism/layout/Footer";
import ProfileInfo from "@/components/organism/profile/ProfileInfo";
import ProfileDetail from "@/components/organism/profile/ProfileDetail";
import SimpleBoardObject from "@/components/organism/main/SimpleBoardObject";
import { getProfileInfoData } from "@/utils/profile/handleProfileInfoData";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { getProfileBoardData } from "@/utils/profile/handleProfileBoardData";
import Link from "next/link";
import styles from "@/styles/profile/profileModal.module.scss";
import { useRouter } from "next/navigation";

interface ModalProfileProps {
  name?: any;
  profileImage?: any;
  birth?: any;
  description?: any;
  authorization?: any;
  uuid?: any;
  influencerUuid?: any;
  reviewWriterName?: any;
  reviewRate?: any;
  reviewContent?: any;
  review?: any;
}

export default function ModalProfile({
  name,
  profileImage,
  birth,
  description,
  authorization,
  uuid,
  influencerUuid,
  review,
}: ModalProfileProps) {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <main className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <ProfileInfo
          name={name}
          src={profileImage}
          description={description}
          authorization={authorization}
          uuid={uuid}
          birth={birth}
          influencerUuid={influencerUuid}
        />
        {/* 이거 스크롤 필요 */}
        <ProfileDetail review={review} />

        <div className={styles.modalBack} onClick={handleBack}>
          돌아가기
        </div>
      </div>
    </main>
  );
}
