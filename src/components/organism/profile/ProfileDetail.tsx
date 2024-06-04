import styles from "@/styles/organism/profileDetail.module.scss";
import IconWithTitle from "@/components/molecules/IconWithTitle";
import ProfileWithText from "@/components/molecules/ProfileWithText";
import { Key } from "react";
import { convertUToKST } from "@/utils/common/convertUToKST";

interface ProfileInfoProps {
  careerInfo?: any[];
  qualificationInfo?: any[];
}

export default function ProfileDetail({
  careerInfo = [],
  qualificationInfo = [],
}: ProfileInfoProps) {
  return (
    <>
      <h2 className={styles["profile-title"]}>INFO</h2>
      <IconWithTitle title="🔗CAREER" detail="판매자 경력 정보입니다." />
      {careerInfo.map(
        (
          item: { job: string; year: any; month: any },
          index: Key | null | undefined
        ) => (
          <ProfileWithText
            key={index}
            title={item.job}
            info1={`${item.year}년 ${item.month}개월`}
          />
        )
      )}
      <IconWithTitle title="🔗CERTIFICATE" detail="판매자 자격 정보입니다." />
      {qualificationInfo.map(
        (
          item: { name: string; agency: string; issueDate: string },
          index: Key | null | undefined
        ) => (
          <ProfileWithText
            key={index}
            title={item.name}
            info1={item.agency}
            info2={convertUToKST(item.issueDate)}
          />
        )
      )}

      <IconWithTitle title="🔗REVIEW" detail="판매자 리뷰 정보입니다." />
      <ProfileWithText title="whdbscks" info1="좋네요!" info2="⭐⭐⭐" />
      <ProfileWithText title="whdbscks" info1="굉장해요!" info2="⭐⭐⭐⭐⭐" />
      <IconWithTitle title="🔗BOARD" detail="판매자 게시글 정보입니다." />
    </>
  );
}
