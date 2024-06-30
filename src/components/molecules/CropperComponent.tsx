import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from "@/styles/organism/mypageProfile.module.scss";
import Modal from "@/components/molecules/Modal";

interface CropperModalProps {
  cropperSrc: string | null;
  isModalOpen: boolean;
  cropperRef: React.RefObject<any>;
  handleCrop: () => void;
  closeModal: () => void;
}

const CropperModal: React.FC<CropperModalProps> = ({
  cropperSrc,
  isModalOpen,
  cropperRef,
  handleCrop,
  closeModal,
}) => {
  return (
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
  );
};

export default CropperModal;
