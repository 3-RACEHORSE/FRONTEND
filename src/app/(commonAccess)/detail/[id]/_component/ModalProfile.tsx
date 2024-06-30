"use client";

import ProfileInfo from "@/components/organism/profile/ProfileInfo";
import ProfileDetail from "@/components/organism/profile/ProfileDetail";
import styles from "@/styles/profile/profileModal.module.scss";
import { useRouter } from "next/navigation";
import { ModalProfileProps } from "@/interface/ModalProfileProps";

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
        <ProfileDetail review={review} />

        <div className={styles.modalBack} onClick={handleBack}>
          돌아가기
        </div>
      </div>
    </main>
  );
}
