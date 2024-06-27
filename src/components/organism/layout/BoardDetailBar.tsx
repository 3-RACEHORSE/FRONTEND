import RemainTime from "@/app/(commonAccess)/detail/[id]/_component/RemainTime";
import styles from "@/styles/organism/boardDetailBar.module.scss";
import { uToMilliseconds } from "@/utils/detail/uToMilliseconds";
import Link from "next/link";

interface BoardDetailBar {
  auctionStartTime?: any;
  state?: any;
  pathName?: any;
}

export default function BoardDetailBar({
  auctionStartTime,
  state,
  pathName,
}: BoardDetailBar) {
  return (
    <nav className={styles["nav-container"]}>
      <Link
        // href={`/profile/${handle}`}
        href="/i/flow/profile/fsdaf"
        className={styles["button-container1"]}
      >
        <div className={styles["info1"]}>출연진 정보 </div>
        <div className={styles["info2"]}>출연진 정보를 확인하세요!</div>
      </Link>
      <div className={styles["button-container2"]}>
        {state === "BEFORE_AUCTION" && (
          <>
            <div className={styles["info3"]}>예정된 경매</div>
            <div className={styles["info4"]}>
              <RemainTime
                endedAtMilliseconds={uToMilliseconds(auctionStartTime)}
              />
            </div>
          </>
        )}
        {state === "AUCTION_IS_IN_PROGRESS" && (
          <>
            <Link href={`/auctionProgress/${pathName}`}>
              <div className={styles["info3"]}>진행중 경매</div>
              <div className={styles["info4"]}>경매가 진행중입니다.🔥</div>
            </Link>
          </>
        )}
        {state === "AUCTION_NORMAL_CLOSING" && (
          <>
            <div className={styles["info3"]}>마감된 경매</div>
            <div className={styles["info4"]}>마감되었습니다.</div>
          </>
        )}
      </div>
    </nav>
  );
}
