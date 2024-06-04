"use client";

import { useState, useRef, ChangeEvent } from "react";
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
import { useRouter } from "next/navigation";
import { handleSendWrite } from "@/utils/write/handleSendWrite";
import { handleImageUpload, handleCrop } from "@/utils/write/imageHandlers";

interface ImageData {
  src: string;
  croppedSrc: string | null;
}

interface WritePageProps {
  authorization: any;
  uuid: any;
}

export default function WritePage({ authorization, uuid }: WritePageProps) {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [images, setImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const cropperRef = useRef<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //검색 추적
  const handleInputTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleInputMinPrice = (event: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
  };

  const handleSelectChange = (value: string) => {
    setCategory(value);
  };

  //사진 삭제
  const deleteImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setCurrentImageIndex(null);
  };

  //모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(null);
    setImages((prevImages) => prevImages.slice(0, -1));
  };

  // 게시글 전송 API
  const handleClick = async () => {
    const thumbnail = images[0].croppedSrc;
    const imagesList = images.slice(1).map((item) => item.croppedSrc);

    await handleSendWrite(
      title,
      content,
      category,
      minPrice,
      thumbnail,
      imagesList,
      authorization,
      uuid,
      router
    );
  };

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
          <p className={styles["input-title"]}>카테고리</p>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className={styles["selectBar"]}>
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

      <p style={{ height: "2vh" }} />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(event) =>
          handleImageUpload(
            event,
            setImages,
            setCurrentImageIndex,
            setIsModalOpen,
            images
          )
        }
        className={styles["fileInput"]}
      />
      <div className={styles["flex-container"]}>
        <ul className={styles["overflow-scroll"]}>
          {images.map((image, index) => (
            <div key={index} className={styles["imageContainer"]}>
              {image.croppedSrc ? (
                <img
                  src={image.croppedSrc}
                  alt={`Cropped ${index}`}
                  className={styles["imageObject"]}
                  onClick={() => deleteImage(index)}
                />
              ) : null}
            </div>
          ))}
        </ul>
        <p className={styles["info"]}>
          🔗첫 번째 사진이 대표 이미지로 지정됩니다.
        </p>
      </div>

      <button className={styles["sendBtn"]} onClick={handleClick}>
        작성 완료
      </button>

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
              <button
                onClick={() =>
                  handleCrop(
                    cropperRef,
                    currentImageIndex,
                    setImages,
                    setIsModalOpen
                  )
                }
                className={styles["cropButton1"]}
              >
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
