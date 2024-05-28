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
import AWS from "aws-sdk";
import Swal from "sweetalert2";

// AWS SDK 설정
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const s3 = new AWS.S3();

const uploadImageToS3 = async (
  croppedCanvas: HTMLCanvasElement
): Promise<string> => {
  try {
    // 이미지 데이터를 base64로 인코딩
    const base64Data = croppedCanvas
      .toDataURL()
      .replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(base64Data, "base64");
    // S3에 업로드할 때 사용할 설정
    const params = {
      Bucket: "cheonma",
      Key: `images/${Date.now()}.png`, // 이미지 파일 이름 설정
      Body: buf,
      ACL: "public-read", // 업로드된 이미지를 공개적으로 접근할 수 있도록 설정
      ContentType: "image/png", // 이미지 파일 타입 지정
    };
    console.log(params);
    // S3에 이미지 업로드 요청
    const { Location } = await s3.upload(params).promise();

    // 업로드된 이미지의 URL 반환
    return Location;
  } catch (error) {
    console.error("Error uploading image to S3:", error);
    throw error;
  }
};

interface ImageData {
  src: string;
  croppedSrc: string | null;
}

interface WritePageProps {
  authorization: any;
  uuid: any;
}
export default function WritePage({ authorization, uuid }: WritePageProps) {
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
      console.log("사진 이미지", croppedCanvas);
      // 이미지를 S3에 업로드하고 URL을 얻어옴
      uploadImageToS3(croppedCanvas)
        .then((imageUrl) => {
          // 업로드된 이미지의 URL을 사용하여 이미지 데이터 업데이트
          setImages((prevImages) =>
            prevImages.map((image, index) =>
              index === currentImageIndex
                ? { ...image, croppedSrc: imageUrl }
                : image
            )
          );
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error handling crop:", error);
        });
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

  //게시글 전송 api
  const handleSendCertify = async () => {
    // apple1은 images의 첫 번째 배열의 copperedSrc 값만 담는 배열
    const thumbnail = [images[0].croppedSrc];

    // apple2는 images의 첫 번째 배열을 제외하고 나머지 copperedSrc 값만 담는 배열
    const imagesList = images.slice(1).map((item) => item.croppedSrc);
    console.log(title, content, category, minPrice, thumbnail, imagesList);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/authorization/auction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authorization}`,
            uuid: `${uuid}`,
          },
          body: JSON.stringify({
            title: title,
            content: content,
            category: category,
            minimumBiddingPrice: minPrice,
            thumbnail: thumbnail,
            images: imagesList,
          }),
        }
      );
      if (res.status === 200) {
        Swal.fire({
          title: "추가되었습니다!",
          icon: "success",
          confirmButtonText: "확인",
        });
        // .then((result) => {
        //   if (result.isConfirmed) {
        //     router.refresh();
        //   }
        // });
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        <p className={styles["info"]}>
          🔗첫 번째 사진이 대표 이미지로 지정됩니다.
        </p>
      </div>

      <button className={styles["btn1"]} onClick={handleSendCertify}>
        추가
      </button>

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
