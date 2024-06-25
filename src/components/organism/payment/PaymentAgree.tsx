import styles from "@/styles/organism/payment.module.scss";

export default function PaymentAgree() {
  return (
    <>
      <article className={styles["article-layout"]}>
        <div className={styles["article-text1"]}>①서비스 이용료 및 요금</div>
        <div className={styles["article-text2"]}>
          서비스 이용 시 발생하는 요금은 서비스의 종류와 이용 방식에 따라 달라질
          수 있습니다. 일회성 요금, 구독료, 사용량 기반 요금 등이 있을 수
          있으며, 요금 변경 사항에 대한 사전 고지가 이루어질 수 있습니다.{" "}
        </div>
        <div className={styles["article-text1"]}>②결제 기간과 주기</div>
        <div className={styles["article-text2"]}>
          일부 서비스는 월 또는 연 단위로 결제되며, 자동 갱신이 설정될 수
          있습니다. 사용자는 결제 주기를 선택하거나 변경할 수 있을 수 있습니다.
        </div>
        <div className={styles["article-text1"]}>③결제 보안</div>
        <div className={styles["article-text2"]}>
          서비스 이용 시 발생하는 요금은 서비스의 종류와 이용 방식에 따라 달라질
          수 있습니다. 일회성 요금, 구독료, 사용량 기반 요금 등이 있을 수
          있으며, 요금 변경 사항에 대한 사전 고지가 이루어질 수 있습니다.{" "}
        </div>
        <div className={styles["article-text1"]}>④서비스 이용료 및 요금</div>
        <div className={styles["article-text2"]}>
          서비스 이용료에는 지역 세법에 따라 적용되는 부가가치세 또는 기타
          세금이 포함될 수 있습니다. 이러한 세금은 결제 시 별도로 표기되거나
          추가될 수 있습니다.
        </div>
      </article>
    </>
  );
}
