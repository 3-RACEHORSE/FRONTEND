import React from "react";
import styles from "@/styles/organism/writePage.module.scss";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function Modal({ isOpen, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles["modalOverlay"]}>
      <div className={styles["modalContent"]}>{children}</div>
    </div>
  );
}
