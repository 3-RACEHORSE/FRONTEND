// SimpleBoardObject.tsx

import React from "react";
import styles from "@/styles/main/main.module.scss";
import BoardInfo from "@/components/molecules/SimpleBoardInfo";

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
      <div className={styles["boardContainer"]}>
        <img src={src} alt="" className={styles["boardImage"]} />
        <div className={styles["categoryLabel"]}>{category}</div>
      </div>
      <p className={styles["boardTitle"]}>{title}</p>
      <p className={styles["boardContent"]}>{content}</p>
      <p className={styles["boardMinPrice"]}>✅최소 {minPrice}</p>
    </div>
  );
}
