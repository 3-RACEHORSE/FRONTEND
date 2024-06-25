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
          <img src="/images/layout/tornPaper.png" />
        </section>
      </header>
    </>
  );
}
