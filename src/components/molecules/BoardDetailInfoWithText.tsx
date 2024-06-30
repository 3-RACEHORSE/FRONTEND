import RemainTime from "@/app/(commonAccess)/detail/[id]/_component/RemainTime";
import styles from "@/styles/organism/boardDetail.module.scss";
import { convertUToKST } from "@/utils/time/convertUToKST";
import { uToMilliseconds } from "@/utils/time/uToMilliseconds";

interface BoardDetailProps {
  auctionStartTime?: any;
  category?: string;
  cast?: string;
  versifier?: string;
  unit?: string;
  boardTitle?: string;
  boardContent?: string;
  eventStartTime?: string;
  place?: string;
  state: string;
}

export default function BoardDetailInfoWithText({
  auctionStartTime,
  category,
  cast,
  versifier,
  unit,
  boardTitle,
  boardContent,
  eventStartTime,
  place,
  state,
}: BoardDetailProps) {
  return (
    <>
      <div className={styles["boardDetail-element1"]}>
        <div className={styles["boardDetail-element1-content"]}>
          <div className={styles["boardDetail-element1-content-title"]}>
            {/* 분기 */}
            {state === "BEFORE_AUCTION" && (
              <p className={styles["deadline"]}>예정</p>
            )}
            {state === "AUCTION_IS_IN_PROGRESS" && (
              <p className={styles["deadline"]}>진행중</p>
            )}
            {state === "AUCTION_NORMAL_CLOSING" && (
              <p className={styles["deadline"]}>마감</p>
            )}
            {/* 분기 */}
            {state === "BEFORE_AUCTION" && (
              <p className={styles["deadlineNotice"]}>경매 진행 예정입니다.</p>
            )}
            {state === "AUCTION_IS_IN_PROGRESS" && (
              <p className={styles["deadlineNotice"]}>현재 진행 중입니다.</p>
            )}
            {state === "AUCTION_NORMAL_CLOSING" && (
              <p className={styles["deadlineNotice"]}>마감된 경매입니다.</p>
            )}
          </div>
          {/* 분기 */}
          {state === "BEFORE_AUCTION" && (
            <div className={styles["boardDetail-element1-content-info"]}>
              <p className={styles["boardDetail-element1-content-info1"]}>
                {convertUToKST(auctionStartTime)} 에 시작
              </p>

              <div className={styles["boardDetail-element1-content-info2"]}>
                <RemainTime
                  endedAtMilliseconds={uToMilliseconds(auctionStartTime)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={styles["boardDetail-element2"]}>
        <p className={styles["boardDetail-element2-content0"]}>🎉 {category}</p>
        <div style={{ display: "flex", alignItems: "center", marginTop: "1%" }}>
          <p className={styles["boardDetail-element2-content2-1"]}>{cast}</p>
          <p className={styles["boardDetail-element2-content2-2"]}>
            {versifier}
          </p>
          <p className={styles["boardDetail-element2-content2-2"]}>+{unit}</p>
        </div>
        <p className={styles["boardDetail-element2-content1"]}>🙌 제목</p>

        <p className={styles["boardDetail-element2-content4"]}>{boardTitle}</p>
        <p className={styles["boardDetail-element2-content1"]}>📢 내용</p>
        <p className={styles["boardDetail-element2-content4"]}>
          {boardContent}
        </p>
        <p className={styles["boardDetail-element2-content1"]}>
          🕛 행사시작 시간
        </p>
        <p className={styles["boardDetail-element2-content4"]}>
          {convertUToKST(eventStartTime)} 에 시작
        </p>
        <p className={styles["boardDetail-element2-content1"]}>📌 장소</p>
        <p className={styles["boardDetail-element2-content4"]}>{place}</p>
      </div>
    </>
  );
}
