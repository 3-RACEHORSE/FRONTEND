import styles from "@/styles/organism/mypageProfile.module.scss";
import SettingWithBtn from "@/components/molecules/SettingWithBtn";
import CallWithText from "@/components/molecules/CallWithText";
import Link from "next/link";

interface MypageProfileProps {
  src?: string;
  name?: string;
  email?: string;
  phoneNum?: string;
  categories?: string[];
}

export default function MypageProfile({
  src,
  name,
  email,
  phoneNum,
  categories = [],
}: MypageProfileProps) {
  return (
    <>
      <div className={styles["mypage-container"]}>
        {/* 프로필 */}
        <div className={styles["mypage-profile"]}>
          <img src={src} alt="" className={styles["profile-img"]} />
          <div className={styles["profile-info"]}>
            <div style={{ display: "flex" }}>
              <p className={styles["profile-name"]}>{name}</p>
            </div>
            <p className={styles["profile-element2"]}>{email}</p>
            <p className={styles["profile-element2"]}>{phoneNum}</p>
          </div>
        </div>
        {/* 카테고리 */}
        <div className={styles["category-container"]}>
          {categories.map((category, index) => (
            <p key={index}>{category}</p>
          ))}
        </div>
        <div className={styles["btn-container"]}>
          <Link href="/mypage/info" className={styles["btn-layout"]}>
            <button>프로필 관리</button>
          </Link>
          {/* <Link href="/mypage/resume" className={styles["btn-layout"]}>
            <button>이력서 관리</button>
          </Link> */}
        </div>
      </div>

      {/* 선택 버튼 */}
      <SettingWithBtn />
      <CallWithText />
    </>
  );
}
