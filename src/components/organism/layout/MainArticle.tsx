import styles from "@/styles/layout/mainArticle.module.scss";
import IconWithTextOne from "@/components/molecules/IconWithTextOne";
import IconWithTextTwo from "@/components/molecules/IconWithTextTwo";

interface MainArticleProps {
  data: {
    totalAuctionCount: string;
    weeklyAddedAuctionCount: string;
    dailyTotalAuctionCount: string;
    currentTimeAddedAuctionCount: string;
    biddingRate: string;
    closedAuctionCount: string;
    progressingAuctionCount: string;
  };
}

export default function MainArticle({ data }: MainArticleProps) {
  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString();
  };

  console.log("데이터 ", data);
  return (
    <article className={styles["main-article-container"]}>
      {/* 1행 */}
      <div className={styles["row"]}>
        <div className={styles["column"]}>
          <IconWithTextOne title="누적 경매" />
          <div className={styles["value-container"]}>
            <p className={styles["bold-text"]}>
              {formatNumber(data.totalAuctionCount)} 건
            </p>
            <p className={styles["green-text"]}>
              ▲ {formatNumber(data.weeklyAddedAuctionCount)}
            </p>
          </div>
        </div>
        <div className={styles["column"]}>
          <IconWithTextTwo title="금일 경매" />
          <div className={styles["value-container"]}>
            <p className={styles["bold-text"]}>
              {formatNumber(data.dailyTotalAuctionCount)} 건
            </p>
            <p className={styles["green-text"]}>
              ▲ {formatNumber(data.currentTimeAddedAuctionCount)}
            </p>
          </div>
        </div>
      </div>
      {/* 2행 */}
      <div className={styles["row"]}>
        <div className={styles["column2"]}>
          <p className={styles["gray-text"]}>입찰률</p>
          <p className={styles["center-text"]}>{data.biddingRate} %</p>
        </div>
        <div className={styles["column2"]}>
          <p className={styles["gray-text"]}>경매건</p>
          <p className={styles["center-text"]}>
            {formatNumber(data.closedAuctionCount)} 건
          </p>
        </div>
        <div className={styles["column2"]}>
          <p className={styles["gray-text"]}>진행중</p>
          <p className={styles["center-text"]}>
            {formatNumber(data.progressingAuctionCount)} 건
          </p>
        </div>
      </div>
    </article>
  );
}
