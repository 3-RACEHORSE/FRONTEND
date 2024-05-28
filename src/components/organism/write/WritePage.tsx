"use client";

import { useState, useRef } from "react";
import styles from "@/styles/organism/writePage.module.scss";
import ResumeWithInputOne from "@/components/molecules/ResumeWithInputOne";
import WriteWithTextArea from "@/components/molecules/WriteWithTextArea";
import MinPriceWithInput from "@/components/molecules/MinPriceWithInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import watchListData from "@/constants/watchListData";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Modal from "./Modal";

interface ImageData {
  src: string;
  croppedSrc: string | null;
}

export default function WritePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleInputMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleSelectChange = (value: string) => {
    setCategory(value);
  };

  const [images, setImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const cropperRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: ImageData[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          newImages.push({ src: reader.result as string, croppedSrc: null });
          if (newImages.length === files.length) {
            setImages((prevImages) => [...prevImages, ...newImages]);
            setCurrentImageIndex(images.length); // 현재 인덱스를 새로 추가된 첫 번째 이미지로 설정
            setIsModalOpen(true);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper && currentImageIndex !== null) {
      const croppedCanvas = cropper.getCroppedCanvas();
      const newCroppedSrc = croppedCanvas.toDataURL();
      //이쪽 위 아래 로직이 이미지 넣는 로직이다. ㅇㅇㅇ 여기서 s3 처리
      setImages((prevImages) =>
        prevImages.map((image, index) =>
          index === currentImageIndex
            ? { ...image, croppedSrc: newCroppedSrc }
            : image
        )
      );
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(null);
    setImages((prevImages) => prevImages.slice(0, -1));
  };

  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setCurrentImageIndex(null);
  };
  console.log(images);

  return (
    <main className={styles["container"]}>
      <div className={styles["adv"]}>천마인력에 글을 등록해 보세요!🙌</div>
      <p style={{ height: "2vh" }} />
      <ResumeWithInputOne title="제목" onChange={handleInputTitle} />
      <p style={{ height: "2vh" }} />
      <WriteWithTextArea title="내용" onChange={handleInputContent} />
      <p style={{ height: "2vh" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <MinPriceWithInput
          title="경매최소금액"
          onChange={handleInputMinPrice}
        />
        <div className={styles["layout1"]}>
          <p className={styles["input-title"]}>카테고리{title}</p>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger
              style={{ height: "63%", border: "2px solid #d4d4d4" }}
            >
              <SelectValue placeholder="선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {watchListData.map((item) => (
                <SelectItem key={item.index} value={item.label}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 사진관련 */}
      <p style={{ height: "2vh" }} />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className={styles["fileInput"]}
      />
      <div className={styles["flex-container"]}>
        <ul className={styles["overflow-scroll"]}>
          {images.map((image, index) => (
            <div key={index} className={styles["imageContainer"]}>
              {image.croppedSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.croppedSrc}
                  alt={`Cropped ${index}`}
                  className={styles["imageObject"]}
                  onClick={() => deleteImage(index)}
                />
              ) : (
                <></>
              )}
            </div>
          ))}
        </ul>
      </div>

      {/* Cropper 모달 */}
      <Modal isOpen={isModalOpen}>
        {currentImageIndex !== null && images[currentImageIndex] && (
          <div className={styles["cropperContainer"]}>
            <Cropper
              src={images[currentImageIndex].src}
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
    </main>
  );
}
