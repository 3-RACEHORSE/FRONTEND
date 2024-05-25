import React, { ChangeEvent } from "react";
import styles from "@/styles/organism/mypageProfile.module.scss";

import {
  PiUserLight,
  PiMoneyWavyThin,
  PiSpeakerSimpleNoneThin,
} from "react-icons/pi";
import { CiViewList, CiHeadphones, CiCircleAlert } from "react-icons/ci";

export default function SettingWithBtn() {
  return (
    <div className={styles["setting-container"]}>
      <div className={styles["setting-element1"]}>
        <div className={styles["setting-element-layout"]}>
          <PiUserLight style={{ width: "25px", height: "25px" }} />
          <p>로그아웃</p>
        </div>
        <div className={styles["setting-element-layout"]}>
          <PiMoneyWavyThin style={{ width: "25px", height: "25px" }} />
          <p>나의경매</p>
        </div>
        <div className={styles["setting-element-layout"]}>
          <CiViewList style={{ width: "25px", height: "25px" }} />
          <p>이용정책</p>
        </div>
      </div>
      <div className={styles["setting-element1"]}>
        <div className={styles["setting-element-layout"]}>
          <CiHeadphones style={{ width: "25px", height: "25px" }} />
          <p>고객센터</p>
        </div>
        <div className={styles["setting-element-layout"]}>
          <CiCircleAlert style={{ width: "25px", height: "25px" }} />
          <p>정보</p>
        </div>
        <div className={styles["setting-element-layout"]}>
          <PiSpeakerSimpleNoneThin style={{ width: "25px", height: "25px" }} />
          <p>공지사항</p>
        </div>
      </div>
      <div style={{ padding: "2.5%" }}>
        <img src="/images/banner/adv1.png" />
      </div>
    </div>
  );
}
