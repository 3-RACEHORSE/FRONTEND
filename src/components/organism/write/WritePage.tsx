"use client";

import { useState } from "react";
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

export default function WritePage() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  //제목 input 추적
  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  //내용 input 추적
  const handleInputContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  //최소가격 input 추적
  const handleInputMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value);
    console.log(minPrice);
  };

  //카테고리
  const handleSelectChange = (value: string) => {
    setCategory(value);
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
    </main>
  );
}
