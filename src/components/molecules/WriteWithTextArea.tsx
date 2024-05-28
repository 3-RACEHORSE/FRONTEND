import React from "react";
import styles from "@/styles/organism/writePage.module.scss";

interface ResumeWithInputProps {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
}

export default function WriteWithTextArea({
  title,
  onChange,
  style,
}: ResumeWithInputProps) {
  return (
    <>
      <p className={styles["input-title"]} style={style}>
        {title}
      </p>
      <textarea className={styles["textarea"]} onChange={onChange} />
    </>
  );
}
