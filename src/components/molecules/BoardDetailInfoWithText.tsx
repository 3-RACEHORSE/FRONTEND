import RemainTime from "@/app/(commonAccess)/detail/[id]/_component/RemainTime";
import styles from "@/styles/organism/boardDetail.module.scss";
import { convertUToKST } from "@/utils/common/convertUToKST";
import { uToMilliseconds } from "@/utils/detail/uToMilliseconds";

interface BoardDetailProps {
  title: string;
  detail?: string;
  endTime?: any;
  category?: string;
  cast?: string;
  versifier?: string;
  unit?: string;
  boardTitle?: string;
  boardContent?: string;
  place?: string;
}

export default function BoardDetailInfoWithText({
  title,
  detail,
  endTime,
  category,
  cast,
  versifier,
  unit,
  boardTitle,
  boardContent,
  place,
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
              {/* {convertUToKST(endTime)} 에 시작 */}
              {"9999.99.99.99에 시작"}
            </p>

            <div className={styles["boardDetail-element1-content-info2"]}>
              <RemainTime
                endedAtMilliseconds={uToMilliseconds(endTime) + 32400000}
              />
              🕛
            </div>
          </div>
        </div>
      </div>
      <div className={styles["boardDetail-element2"]}>
        <p className={styles["boardDetail-element2-content0"]}>{category}</p>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p className={styles["boardDetail-element2-content2-1"]}>{cast}</p>
          <p className={styles["boardDetail-element2-content2-2"]}>
            {versifier}
          </p>
          <p className={styles["boardDetail-element2-content2-2"]}>+{unit}</p>
        </div>
        <p className={styles["boardDetail-element2-content1"]}>제목</p>

        <p className={styles["boardDetail-element2-content4"]}>{boardTitle}</p>
        <p className={styles["boardDetail-element2-content1"]}>내용</p>
        <p className={styles["boardDetail-element2-content4"]}>
          {boardContent}
        </p>
        <p className={styles["boardDetail-element2-content1"]}>장소</p>
        <p className={styles["boardDetail-element2-content4"]}>{place}</p>
      </div>
    </>
  );
}
