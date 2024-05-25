import React from "react";
import styles from "@/styles/organism/mypageProfile.module.scss";
import SettingWithBtn from "@/components/molecules/SettingWithBtn";
import CallWithText from "@/components/molecules/CallWithText";

interface MypageProfileProps {
  src?: string;
  name?: string;
  follower?: string;
  following?: string;
  categories?: string[];
}

export default function MypageProfile({
  src,
  name,
  follower,
  following,
  categories = [],
}: MypageProfileProps) {
  return (
    <>
      <div className={styles["mypage-container"]}>
        {/* 프로필 */}
        <div className={styles["mypage-profile"]}>
          <img src={src} alt="" className={styles["profile-img"]} />
          <div className={styles["profile-info"]}>
            <p className={styles["profile-name"]}>{name}</p>
            <div style={{ display: "flex" }}>
              <p className={styles["profile-element1"]}>팔로워 {follower}</p>
              <p className={styles["profile-element2"]}>팔로잉 {following}</p>
            </div>
          </div>
        </div>
        {/* 카테고리 */}
        <div className={styles["category-container"]}>
          {categories.map((category, index) => (
            <p key={index}>{category}</p>
          ))}
        </div>
        <div className={styles["btn-container"]}>
          <button>프로필 관리</button>
          <button>이력서 관리</button>
        </div>
      </div>
      {/* 선택 버튼 */}
      <SettingWithBtn />
      <CallWithText />
    </>
  );
}
