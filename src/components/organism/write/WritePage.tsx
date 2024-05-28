"use client";

import { useState } from "react";
import styles from "@/styles/organism/writePage.module.scss";
import ResumeWithInputOne from "@/components/molecules/ResumeWithInputOne";
import WriteWithTextArea from "@/components/molecules/WriteWithTextArea";
import MinPriceWithInput from "@/components/molecules/MinPriceWithInput";

export default function WritePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleInputMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  return (
    <main className={styles["container"]}>
      <div className={styles["adv"]}>천마인력에 글을 등록해 보세요!🙌</div>
      <ResumeWithInputOne title="제목" onChange={handleInputTitle} />
      <WriteWithTextArea title="내용" onChange={handleInputContent} />
      <div style={{ display: "flex" }}>
        <MinPriceWithInput
          title="경매최소금액"
          onChange={handleInputMinPrice}
        />
      </div>
    </main>
  );
}
