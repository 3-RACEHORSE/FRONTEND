import styles from "@/styles/organism/boardDetailNotice.module.scss";

export default function BoardDetailNotice() {
  return (
    <div className={styles["boardDetailInfo-container"]}>
      <div className={styles["title"]}>서비스 이용 유의사항</div>
      <h4 className={styles["content-title"]}>①결제 방법과 기한</h4>
      <p className={styles["content"]}>
        결제 방법과 기한을 준수하십시오. 경매 종료 후 정해진 기간 내에 결제를
        완료하지 않으면 입찰이 취소될 수 있으며, 일정 금액의 벌금이 부과될 수
        있습니다.
      </p>
      <h4 className={styles["content-title"]}>②행사 규칙 준수</h4>
      <p className={styles["content"]}>
        팬미팅 참석 시 주최 측의 모든 규칙과 지침을 준수해야 합니다. 위반 시
        경고 없이 퇴장 조치될 수 있습니다.
      </p>
      <h4 className={styles["content-title"]}>③돌발행동</h4>
      <p className={styles["content"]}>
        팬미팅 중 연예인이나 다른 참석자에게 물리적, 언어적 위협을 가하는 행위는
        돌발행동으로 간주됩니다. 이러한 행동은 법적 조치의 대상이 될 수
        있습니다.
      </p>
      <h4 className={styles["content-title"]}>④법적 대응</h4>
      <p className={styles["content"]}>
        돌발행동 발생 시 주최 측은 경찰에 신고할 수 있으며, 해당 행동에 대한
        법적 처벌을 받을 수 있습니다. 폭행, 명예훼손 등 형법에 따라 처벌될 수
        있습니다.
      </p>
      <h4 className={styles["content-title"]}>⑤손해배상 청구</h4>
      <p className={styles["content"]}>
        돌발행동으로 인해 발생한 손해에 대해서는 주최 측이나 피해자가 민사
        소송을 통해 손해배상을 청구할 수 있습니다.
      </p>
    </div>
  );
}
