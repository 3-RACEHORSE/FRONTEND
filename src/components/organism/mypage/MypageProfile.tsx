"use client";

import React, { useRef, useState, useEffect } from "react";
import Modal from "@/components/organism/write/Modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "@/styles/organism/mypageProfile.module.scss";
import SettingWithBtn from "@/components/molecules/SettingWithBtn";
import CallWithText from "@/components/molecules/CallWithText";
import Link from "next/link";
import { uploadImageToS3 } from "@/utils/write/aws";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useDarkMode } from "@/hooks/common/checkDarkMode";
interface MypageProfileProps {
  src: string;
  name: string;
  email: string;
  phoneNum: string;
  authorization: any;
  uuid: any;
}

export default function MypageProfile({
  src,
  name,
  email,
  phoneNum,
  authorization,
  uuid,
}: MypageProfileProps) {
  //다크모드 시작
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

  //다크모드 끝
  const [profileImage, setProfileImage] = useState(src);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);
  const cropperRef = useRef<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeProfileImg = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropperSrc(reader.result as string);
      setIsModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCrop = async () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      const uploadedImageUrl = await uploadImageToS3(croppedCanvas);
      console.log(uploadedImageUrl);
      setProfileImage(uploadedImageUrl);
      setIsModalOpen(false);
      handleChangeImgData(
        authorization,
        uuid,
        name,
        phoneNum,
        uploadedImageUrl
      );
    }
  };

  const handleChangeImgData = async (
    authorization: any,
    uuid: any,
    name: string,
    phoneNum: string,
    uploadedImageUrl: string
  ) => {
    console.log(
      "데이터 통신",
      authorization,
      uuid,
      name,
      phoneNum,
      uploadedImageUrl
    );
    try {
      console.log(authorization, uuid, name, phoneNum, profileImage);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/users/modify`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
          body: JSON.stringify({
            name: name,
            phoneNum: phoneNum,
            profileImage: uploadedImageUrl,
          }),
        }
      );
      console.log(res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles["mypage-container"]}>
        {/* 프로필 */}
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

          {/* <Link href="/mypage/resume" className={styles["btn-layout"]}>
            <button>이력서 관리</button>
          </Link> */}
        </div>
      </div>
      {/* Modal for cropping */}
      <Modal isOpen={isModalOpen}>
        {cropperSrc && (
          <div className={styles["cropperContainer"]}>
            <Cropper
              src={cropperSrc}
              style={{ height: "fit-content", width: "100%" }}
              initialAspectRatio={1}
              aspectRatio={1}
              guides={false}
              ref={cropperRef}
              zoomable={false}
            />
            <div className={styles["cropperBtnContainer"]}>
              <button onClick={handleCrop} className={styles["cropButton1"]}>
                확인
              </button>
              <button onClick={closeModal} className={styles["cropButton2"]}>
                취소
              </button>
            </div>
          </div>
        )}
      </Modal>
      <SettingWithBtn />
      <CallWithText />
    </>
  );
}
