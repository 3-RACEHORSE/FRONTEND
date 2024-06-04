import styles from "@/styles/organism/boardDetailBar.module.scss";
import dynamic from "next/dynamic";
import Link from "next/link";

interface BoardDetailBarProps {
  subscribed: any;
  isSession: any;
  auctionUuid: any;
  handle: any;
  sellerUuid: any;
}

export default function BoardDetailBar({
  subscribed,
  isSession,
  auctionUuid,
  handle,
  sellerUuid,
}: BoardDetailBarProps) {
  const FSaved = dynamic(() => import("@/components/atoms/icon/false/FSaved"));
  const TSaved = dynamic(() => import("@/components/atoms/icon/true/TSaved"));

  return (
    <>
      <nav className={styles["nav-container"]}>
        {isSession && (
          <>
            <div className={styles["nav-iconWithText-container"]}>
              {subscribed && <TSaved />}
              {!subscribed && <FSaved />}
            </div>
            <Link
              href={`/profile/${handle}`}
              className={styles["button-container1"]}
            >
              <p className={styles["info1"]}>판매자 정보 </p>
              <p className={styles["info2"]}>판매자 정보를 확인하세요!</p>
            </Link>
            <div className={styles["button-container2"]}>
              <p className={styles["info3"]}>입찰하기(99,999 ▲) </p>
              <p className={styles["info4"]}>새로운 입찰가</p>
            </div>
          </>
        )}
        {!isSession && (
          <>
            <Link
              href={`/profile/${handle}`}
              className={styles["button-container3"]}
            >
              <p className={styles["info1"]}>판매자 정보 </p>
              <p className={styles["info2"]}>판매자 정보를 확인하세요!</p>
            </Link>
            <Link href="/login" className={styles["button-container4"]}>
              <p className={styles["info3"]}>로그인 하기 </p>
              <p className={styles["info4"]}>로그인 후, 입찰가능 합니다!</p>
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
