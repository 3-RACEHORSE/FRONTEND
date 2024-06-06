"use client";

import React, { useRef, useState } from "react";
import Modal from "@/components/organism/write/Modal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "@/styles/organism/mypageProfile.module.scss";
import SettingWithBtn from "@/components/molecules/SettingWithBtn";
import CallWithText from "@/components/molecules/CallWithText";
import Link from "next/link";
import { uploadImageToS3 } from "@/utils/write/aws";
import Swal from "sweetalert2";

interface MypageProfileProps {
  src: string;
  name: string;
  handle: string;
  email: string;
  phoneNum: string;
  categories: string[];
  authorization: any;
  uuid: any;
}

export default function MypageProfile({
  src,
  name,
  handle,
  email,
  phoneNum,
  categories = [],
  authorization,
  uuid,
}: MypageProfileProps) {
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
        handle,
        uploadedImageUrl
      );
    }
  };

  const handleChangeImgData = async (
    authorization: any,
    uuid: any,
    name: string,
    phoneNum: string,
    handle: string,
    uploadedImageUrl: string
  ) => {
    console.log("데이토 통신");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/users/modify`,
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
            handle: handle,
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
              <p className={styles["profile-element1"]}>{handle}</p>
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
          <Link href="/mypage/resume" className={styles["btn-layout"]}>
            <button>이력서 관리</button>
          </Link>
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
