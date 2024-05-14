// SimpleBoardObject.tsx

import React from "react";
import styles from "@/styles/main/main.module.scss";
import BoardInfo from "@/components/molecules/SimpleBoardInfo";
import SimpleBoardInfo from "@/components/molecules/SimpleBoardInfo";
import ImgWithCategory from "@/components/molecules/ImgWithCategory";

interface BoardProps {
  category?: string;
  title?: string;
  content?: string;
  src?: string;
  minPrice?: string;
}

export default function SimpleBoardObject({
  category,
  title,
  content,
  src,
  minPrice,
}: BoardProps) {
  return (
    <div className={styles["flexBox"]}>
      <ImgWithCategory src={src} category={category} />
      <SimpleBoardInfo title={title} content={content} minPrice={minPrice} />
    </div>
  );
}
