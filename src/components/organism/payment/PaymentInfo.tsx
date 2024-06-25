import styles from "@/styles/organism/payment.module.scss";

export default function PaymentInfo() {
  return (
    <>
      <header className={styles["payment-header"]}>
        <section className={styles["payment-header-element1"]}>
          <img src="/icons/paymentIcon.png" />
          <div className={styles["payment-header-flex-column"]}>
            <div className={styles["payment-header-div1"]}></div>
            <div className={styles["payment-header-div2"]}>
              <p>결제금액</p>
            </div>
            <div className={styles["payment-header-div3"]}>10,000</div>
          </div>
        </section>
        <section className={styles["payment-header-element2"]}>
          <img
            className={styles["elment2-img"]}
            src="/images/layout/tornPaper.png"
          ></img>
          <div className={styles["elment2-info"]}>
            <div className={styles["elment2-info1"]}>
              <p style={{ color: "#a3a3a3" }}>회사명</p>
              <p style={{ color: "#333333" }}>(주)경주마</p>
            </div>
            <div className={styles["elment2-info2"]}>
              <p style={{ color: "#a3a3a3" }}>경매명</p>
              <p style={{ color: "#333333" }}>SHIN-875</p>
            </div>
          </div>
        </section>
      </header>
    </>
  );
}
