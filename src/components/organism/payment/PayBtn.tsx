"use client";

import styles from "@/styles/organism/payment.module.scss";
import React, { useEffect } from "react";

export default function PayBtn() {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window as any;
    IMP.init(`${process.env.NEXT_PUBLIC_REACT_APP_IMP}`);

    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "결제 테스트",
      amount: "100",
      custom_data: {
        name: "부가정보",
        desc: "세부 부가정보",
      },
      buyer_name: "경주마",
      buyer_tel: "01012345678",
      buyer_email: "14279625@gmail.com",
      buyer_addr: "경주마로 000-00",
      buyer_postalcode: "01234",
      m_redirect_url: "http://localhost:3000/payment/1",
    };
    IMP.request_pay(data);
  };

  /*쿼리스트링 일시 추가 */
  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      console.log("헬로");
    }
  }, []);

  return (
    <div className={styles["pay-button-layout"]}>
      <button className={styles["pay-button"]} onClick={onClickPayment}>
        버튼
      </button>
    </div>
  );
}
