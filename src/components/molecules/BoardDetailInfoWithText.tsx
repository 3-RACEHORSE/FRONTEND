import RemainTime from "@/app/(commonAccess)/detail/[id]/_component/RemainTime";
import styles from "@/styles/organism/boardDetail.module.scss";
import { convertUToKST } from "@/utils/common/convertUToKST";
import { uToMilliseconds } from "@/utils/detail/uToMilliseconds";

interface BoardDetailProps {
  title: string;
  detail?: string;
  endTime?: any;
  category?: string;
  price?: string;
  boardTitle?: string;
  boardContent?: string;
}

export default function BoardDetailInfoWithText({
  title,
  detail,
  endTime,
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
              {convertUToKST(endTime)} 까지
            </p>
            <p className={styles["boardDetail-element1-content-info2"]}>
              <RemainTime
                endedAtMilliseconds={uToMilliseconds(endTime) + 32400000}
              />
              남음🕛
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
