import styles from "@/styles/organism/payment.module.scss";

export default function PayBtn() {
  return (
    <div className={styles["pay-button-layout"]}>
      <button className={styles["pay-button"]}>동의하고 결제</button>
    </div>
  );
}
