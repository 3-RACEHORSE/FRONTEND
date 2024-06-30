"use client";

import { useRef, Dispatch, SetStateAction } from "react";
import { uploadImageToS3 } from "@/utils/s3/aws";
import { handleChangeImgData } from "@/apis/patchChangeImgData";
interface UseImageHandlersProps {
  src: string;
  authorization: string;
  uuid: string;
  name: string;
  phoneNum: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  setProfileImage: Dispatch<SetStateAction<string>>;
  setCropperSrc: Dispatch<SetStateAction<string | null>>;
}

export const useImageHandlers = ({
  src,
  authorization,
  uuid,
  name,
  phoneNum,
  setIsModalOpen,
  setProfileImage,
  setCropperSrc,
}: UseImageHandlersProps) => {
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

  return {
    handleChangeProfileImg,
    handleFileChange,
    handleCrop,
    cropperRef,
    fileInputRef,
  };
};
