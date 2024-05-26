// components/atoms/InputField.tsx
import React from "react";
import styles from "@/styles/organism/resumeEdit.module.scss";

interface ResumeWithInputProps {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export default function ResumeWithInputOne({
  title,
  onChange,
  style,
}: ResumeWithInputProps) {
  return (
    <>
      <p className={styles["input-title"]} style={style}>
        {title}
      </p>
      <input className={styles["input"]} type="text" onChange={onChange} />
    </>
  );
}
