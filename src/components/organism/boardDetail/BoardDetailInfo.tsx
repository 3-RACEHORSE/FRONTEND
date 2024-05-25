import styles from "@/styles/organism/boardDetailInfo.module.scss";
import AreaChart from "@/components/organism/chart/AreaChart";

export default function BoardDetailInfo() {
  return (
    <div className={styles["boardDetailInfo-container"]}>
      <div className={styles["title"]}>체결 입찰 내역</div>
      <AreaChart />
      <div className={styles["list-title"]}>
        <p className={styles["list-title-text"]}>날짜(오름차순)</p>
        <p className={styles["list-title-text"]}>가격(원)</p>
      </div>
      <ul className={styles["list-container"]}>
        <li className={styles["list-element-layout"]}>
          <p className={styles["flex"]}>9999.99.99.99</p>
          <p className={styles["flex"]}>99999 원</p>
        </li>
        <li className={styles["list-element-layout"]}>
          <p className={styles["flex"]}>9999.99.99.99</p>
          <p className={styles["flex"]}>60000 원</p>
        </li>
        <li className={styles["list-element-layout"]}>
          <p className={styles["flex"]}>9999.99.99.99</p>
          <p className={styles["flex"]}>50001 원</p>
        </li>
        <li className={styles["list-element-layout"]}>
          <p className={styles["flex"]}>9999.99.99.99</p>
          <p className={styles["flex"]}>49999 원</p>
        </li>
        <li className={styles["list-element-layout"]}>
          <p className={styles["flex"]}>9999.99.99.99</p>
          <p className={styles["flex"]}>44100 원</p>
        </li>
      </ul>
    </div>
  );
}
