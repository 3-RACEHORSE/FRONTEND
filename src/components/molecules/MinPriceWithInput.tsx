// components/atoms/InputField.tsx
import React from "react";
import styles from "@/styles/organism/writePage.module.scss";

interface ResumeWithInputProps {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export default function MinPriceWithInput({
  title,
  onChange,
  style,
}: ResumeWithInputProps) {
  return (
    <div className={styles["layout1"]}>
      <p className={styles["input-title"]} style={style}>
        {title}
      </p>
      <input className={styles["input2"]} type="text" onChange={onChange} />
    </div>
  );
}
