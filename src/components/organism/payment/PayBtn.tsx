"use client";

import React from "react";
import Link from "next/link";
import usePayment from "@/hooks/payment/usePayment";
import styles from "@/styles/organism/payment.module.scss";

interface PayBtnProps {
  authorization: any;
  uuid: any;
  pathName: any;
  price: any;
}

const PayBtn: React.FC<PayBtnProps> = ({
  authorization,
  uuid,
  pathName,
  price,
}: PayBtnProps) => {
  const { onClickPayment, btnValid } = usePayment(
    authorization,
    uuid,
    pathName,
    price
  );

  return (
    <div className={styles["pay-button-layout"]}>
      {!btnValid && (
        <button className={styles["pay-button"]} onClick={onClickPayment}>
          결제
        </button>
      )}
      {btnValid && (
        <Link href="/">
          <button className={styles["pay-button"]}>완료</button>
        </Link>
      )}
    </div>
  );
};

export default PayBtn;
