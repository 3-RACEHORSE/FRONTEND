import React from "react";
import styles from "@/styles/organism/resumeEdit.module.scss";

interface ResumeWithInputProps {
  title: string;

  onChange1: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange2: (event: React.ChangeEvent<HTMLInputElement>) => void;

  style?: React.CSSProperties;
}

export default function ResumeWithInputTwo({
  title,
  onChange1,
  onChange2,
  style,
}: ResumeWithInputProps) {
  return (
    <>
      <p className={styles["input-title"]} style={style}>
        {title}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <input className={styles["input2"]} type="text" onChange={onChange1} />
        <p className={styles["content"]}>년</p>
        <input className={styles["input2"]} type="text" onChange={onChange2} />
        <p className={styles["content"]}>개월</p>
      </div>
    </>
  );
}
