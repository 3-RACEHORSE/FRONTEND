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

export default function ModalProfile() {
  // 추후 여기 props로 받아야함
  // const pathName = props.params.id;

  // const authorization = cookies().get("authorization")?.value;
  // const uuid = cookies().get("uuid")?.value;
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <main className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <ProfileInfo
          name="아이유"
          src="https://wimg.mk.co.kr/meet/neds/2021/03/image_readtop_2021_291080_16167514554588643.jpg"
          handle="@dkdldb"
          authorization="Fsfsdfsdafsa"
          uuid="21938581"
          follow={true}
        />
        {/* 이거 스크롤 필요 */}
        <ProfileDetail />

        <div className={styles.modalBack} onClick={handleBack}>
          돌아가기
        </div>
      </div>
    </main>
  );
}
