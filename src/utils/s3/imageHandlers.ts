// utils/imageHandlers.ts
import { ChangeEvent, Dispatch, SetStateAction, MutableRefObject } from "react";
import { uploadImageToS3 } from "@/utils/s3/aws";

interface ImageData {
  src: string;
  croppedSrc: string | null;
}

export const handleImageUpload = (
  event: ChangeEvent<HTMLInputElement>,
  setImages: Dispatch<SetStateAction<ImageData[]>>,
  setCurrentImageIndex: Dispatch<SetStateAction<number | null>>,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
  images: ImageData[]
) => {
  const files = event.target.files;
  if (files) {
    const newImages: ImageData[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push({ src: reader.result as string, croppedSrc: null });
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
          setCurrentImageIndex(images.length);
          setIsModalOpen(true);
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

export const handleCrop = (
  cropperRef: MutableRefObject<any>,
  currentImageIndex: number | null,
  setImages: Dispatch<SetStateAction<ImageData[]>>,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
) => {
  const cropper = cropperRef.current?.cropper;
  if (cropper && currentImageIndex !== null) {
    const croppedCanvas = cropper.getCroppedCanvas();
    // 이미지를 S3에 업로드하고 URL을 얻어옴
    uploadImageToS3(croppedCanvas)
      .then((imageUrl: any) => {
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
      .catch((error: any) => {
        console.error("Error handling crop:", error);
      });
  }
};
