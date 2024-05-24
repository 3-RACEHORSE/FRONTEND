"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/mypageProfile.module.scss";
import IconWithTitle from "@/components/molecules/IconWithTitle";
import IconWithTextOne from "@/components/molecules/IconWithTitle";
import { PiUserLight } from "react-icons/pi";
import { PiMoneyWavyThin } from "react-icons/pi";
import { CiViewList } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { CiCircleAlert } from "react-icons/ci";
import { PiSpeakerSimpleNoneThin } from "react-icons/pi";

export default function MypageProfile() {
  return (
    <>
      <div className={styles["mypage-container"]}>
        {/* 프로필 */}
        <div className={styles["mypage-profile"]}>
          <img
            src="/dummy/profile.jpg"
            alt=""
            className={styles["profile-img"]}
          ></img>
          <div className={styles["profile-info"]}>
            <p className={styles["profile-name"]}>CHO</p>
            <div style={{ display: "flex" }}>
              <p className={styles["profile-element1"]}>팔로워 99 </p>
              <p className={styles["profile-element2"]}>팔로잉 99</p>
            </div>
          </div>
        </div>
        {/* 카테고리 */}
        <div className={styles["category-container"]}>
          <p>디자인</p>
          <p>IT·프로그래밍</p>
          <p>세무·법무·노무</p>
          <p>취업·입시</p>
          <p>취미·레슨</p>
        </div>
        <div className={styles["btn-container"]}>
          <button>프로필 관리</button>
          <button>이력서 관리</button>
        </div>
      </div>
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
            <PiSpeakerSimpleNoneThin
              style={{ width: "25px", height: "25px" }}
            />
            <p>공지사항</p>
          </div>
        </div>
        <div style={{ padding: "2.5%" }}>
          <img src="/images/banner/adv1.png"></img>
        </div>
      </div>
      <div style={{ padding: "3%" }}>
        <h2 style={{ fontWeight: "bold" }}>고객센터</h2>
        <p style={{ fontSize: "13px", color: "grey", marginTop: "15px" }}>
          운영시간 평일 10:00 ~ 18:00 (토·일, 공휴일 휴무)
        </p>
        <p style={{ fontSize: "13px", color: "grey" }}>
          점심시간 평일 13:00 ~ 14:00
        </p>
        <div className={styles["btn-container2"]}>
          <button className={styles["button1"]}>자주 묻는 질문</button>
          <button className={styles["button2"]}>1:1 문의</button>
        </div>
      </div>
    </>
  );
}
