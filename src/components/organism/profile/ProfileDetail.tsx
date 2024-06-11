import styles from "@/styles/organism/profileDetail.module.scss";
import IconWithTitle from "@/components/molecules/IconWithTitle";
import ProfileWithText from "@/components/molecules/ProfileWithText";
import { Key } from "react";
import { convertUToKST } from "@/utils/common/convertUToKST";

export default function ProfileDetail() {
  return (
    <>
      <IconWithTitle title="🔗REVIEW" detail="출연진 리뷰 정보입니다." />
      <ProfileWithText title="whdbscks" info1="좋네요!" info2="⭐⭐⭐" />
      <ProfileWithText title="wjdwodbs" info1="굉장해요!" info2="⭐⭐⭐⭐⭐" />
      <ProfileWithText title="dltjdyd" info1="좋네요!" info2="⭐⭐⭐" />
      <ProfileWithText title="rlaguswns" info1="굉장해요!" info2="⭐⭐⭐⭐⭐" />
      <ProfileWithText title="qkrcksdnd" info1="좋네요!" info2="⭐⭐⭐" />
    </>
  );
}
