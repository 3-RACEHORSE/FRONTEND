import styles from "@/styles/organism/mypageProfile.module.scss";

export default function CallWithText() {
  return (
    <div style={{ padding: "3%" }}>
      <h2 style={{ fontWeight: "bold" }}>고객센터</h2>
      <p style={{ fontSize: "13px", color: "grey", marginTop: "15px" }}>
        운영시간 평일 10:00 ~ 18:00 (토·일, 공휴일 휴무)
      </p>
      <p style={{ fontSize: "13px", color: "grey" }}>
        점심시간 평일 13:00 ~ 14:00
      </p>
      <div className={styles["btn-container2"]}>
        <button className={styles["button1"]}>자주 묻는 질문</button>
        <button className={styles["button2"]}>1:1 문의</button>
      </div>
    </div>
  );
}
