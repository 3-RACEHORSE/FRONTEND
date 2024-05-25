import styles from "@/styles/organism/boardDetail.module.scss";

interface BoardDetailProps {
  title: string;
  detail?: string;
  detailDate?: string;
  deadLine?: string;
  category?: string;
  price?: string;
  boardTitle?: string;
  boardContent?: string;
}

export default function BoardDetailInfoWithText({
  title,
  detail,
  detailDate,
  deadLine,
  category,
  price,
  boardTitle,
  boardContent,
}: BoardDetailProps) {
  return (
    <>
      <div className={styles["boardDetail-element1"]}>
        <div className={styles["boardDetail-element1-content"]}>
          <div className={styles["boardDetail-element1-content-title"]}>
            <p className={styles["deadline"]}>{title}</p>
            <p className={styles["deadlineNotice"]}>{detail}</p>
          </div>
          <div className={styles["boardDetail-element1-content-info"]}>
            <p className={styles["boardDetail-element1-content-info1"]}>
              {detailDate} 까지
            </p>
            <p className={styles["boardDetail-element1-content-info2"]}>
              {deadLine}시간 남음🕛
            </p>
          </div>
        </div>
      </div>
      <div className={styles["boardDetail-element2"]}>
        <p className={styles["boardDetail-element2-content1"]}>{category}</p>
        <p className={styles["boardDetail-element2-content2"]}>{price} 원</p>
        <p className={styles["boardDetail-element2-content3"]}>{boardTitle}</p>
        <p className={styles["boardDetail-element2-content4"]}>
          {boardContent}
        </p>
      </div>
    </>
  );
}
