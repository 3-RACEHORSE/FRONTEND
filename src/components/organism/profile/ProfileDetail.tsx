import styles from "@/styles/organism/profileDetail.module.scss";
import IconWithTitle from "@/components/molecules/IconWithTitle";
import ProfileWithText from "@/components/molecules/ProfileWithText";

export default function ProfileDetail() {
  return (
    <>
      <h2 className={styles["profile-title"]}>INFO</h2>
      <IconWithTitle title="🔗CAREER" detail="판매자 경력 정보입니다." />
      <ProfileWithText title="전기배선사" info1="5년5개월" />
      <IconWithTitle title="🔗CERTIFICATE" detail="판매자 자격 정보입니다." />
      <ProfileWithText
        title="전기기사"
        info1="한국안전공사"
        info2="9999.99.99"
      />
      <IconWithTitle title="🔗REVIEW" detail="판매자 리뷰 정보입니다." />
      <ProfileWithText title="whdbscks" info1="좋네요!" info2="⭐⭐⭐" />
      <ProfileWithText title="whdbscks" info1="굉장해요!" info2="⭐⭐⭐⭐⭐" />
      <IconWithTitle title="🔗BOARD" detail="판매자 게시글 정보입니다." />
    </>
  );
}
