import styles from "@/styles/layout/mainArticle.module.scss";
import BusinessCard from "@/components/atoms/icon/Approval";
import IconWithTextOne from "@/components/molecules/IconWithTextOne";
import IconWithTextTwo from "@/components/molecules/IconWithTextTwo";

export default function MainArticle() {
  return (
    <article className={styles["main-article-container"]}>
      {/* 1행 */}
      <div className={styles["row"]}>
        <div className={styles["column"]}>
          <IconWithTextOne title="누적 경매" />
          <div className={styles["value-container"]}>
            <p className={styles["bold-text"]}>9,999 건</p>
            <p className={styles["green-text"]}>▲ 99</p>
          </div>
        </div>
        <div className={styles["column"]}>
          <IconWithTextTwo title="금일 경매" />
          <div className={styles["value-container"]}>
            <p className={styles["bold-text"]}>99 건</p>
            <p className={styles["green-text"]}>▲ 9</p>
          </div>
        </div>
      </div>
      {/* 2행 */}
      <div className={styles["row"]}>
        <div className={styles["column2"]}>
          <p className={styles["gray-text"]}>입찰률</p>
          <p className={styles["center-text"]}>99 %</p>
        </div>
        <div className={styles["column2"]}>
          <p className={styles["gray-text"]}>경매건</p>
          <p className={styles["center-text"]}>999 건</p>
        </div>
        <div className={styles["column2"]}>
          <p className={styles["gray-text"]}>진행중</p>
          <p className={styles["center-text"]}>99 건</p>
        </div>
      </div>
    </article>
  );
}
