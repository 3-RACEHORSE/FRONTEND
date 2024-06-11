import RemainTime from "@/app/(commonAccess)/detail/[id]/_component/RemainTime";
import styles from "@/styles/organism/boardDetailBar.module.scss";
import { uToMilliseconds } from "@/utils/detail/uToMilliseconds";
import Link from "next/link";

interface BoardDetailBar {
  endTime?: any;
}

export default function BoardDetailBar({ endTime }: BoardDetailBar) {
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
        <div className={styles["info3"]}>경매 시작</div>
        <div className={styles["info4"]}>
          <RemainTime
            endedAtMilliseconds={uToMilliseconds(endTime) + 32400000}
          />
        </div>
      </div>
    </nav>
  );
}
