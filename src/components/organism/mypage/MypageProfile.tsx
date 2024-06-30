"use client";

import React, { useState, useEffect } from "react";
import styles from "@/styles/organism/mypageProfile.module.scss";
import SettingWithBtn from "@/components/molecules/SettingWithBtn";
import CallWithText from "@/components/molecules/CallWithText";
import Link from "next/link";
import Cookies from "js-cookie";
import { useDarkMode } from "@/hooks/common/checkDarkMode";
import CropperModal from "@/components/molecules/CropperComponent";
import { MypageProfileProps } from "@/interface/MypageProfileProps";
import { useImageHandlers } from "@/hooks/mypage/useImageHandlers";

export default function MypageProfile({
  src,
  name,
  email,
  phoneNum,
  authorization,
  uuid,
}: MypageProfileProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mode = useDarkMode();

  useEffect(() => {
    const savedMode = Cookies.get("mode");
    if (!savedMode) {
      Cookies.set("mode", "light");
    } else if (savedMode === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [mode]);

  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
    const newMode = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", newMode);
    Cookies.set("mode", newMode);
  };

  const [profileImage, setProfileImage] = useState(src);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);

  const {
    handleChangeProfileImg,
    handleFileChange,
    handleCrop,
    cropperRef,
    fileInputRef,
  } = useImageHandlers({
    src,
    authorization,
    uuid,
    name,
    phoneNum,
    setIsModalOpen,
    setProfileImage,
    setCropperSrc,
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles["mypage-container"]}>
        <div className={styles["mypage-profile"]}>
          <div
            className={styles["profile-img"]}
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: "cover",
            }}
            onClick={handleChangeProfileImg}
          >
            <p className={styles["profile-img-btn"]}>편집</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div className={styles["profile-info"]}>
            <div style={{ display: "flex" }}>
              <p className={styles["profile-name"]}>{name}</p>
            </div>
            <p className={styles["profile-element2"]}>{email}</p>
            <p className={styles["profile-element2"]}>{phoneNum}</p>
          </div>
        </div>

        <div className={styles["btn-container"]}>
          <Link href="/mypage/info" className={styles["btn-layout"]}>
            <button className={styles["btn-container-button1"]}>
              프로필 관리
            </button>
          </Link>
          <div className={styles["btn-layout"]}>
            {isDarkMode && (
              <button
                className={styles["btn-container-button2"]}
                onClick={darkModeHandler}
              >
                다크모드 해제
              </button>
            )}
            {!isDarkMode && (
              <button
                className={styles["btn-container-button2"]}
                onClick={darkModeHandler}
              >
                다크모드
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Modal for cropping */}
      <CropperModal
        cropperSrc={cropperSrc}
        isModalOpen={isModalOpen}
        cropperRef={cropperRef}
        handleCrop={handleCrop}
        closeModal={closeModal}
      />
      <SettingWithBtn />
      <CallWithText />
    </>
  );
}
