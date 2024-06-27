"use client";

import styles from "@/styles/organism/payment.module.scss";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

interface PayBtnProps {
  authorization: any;
  uuid: any;
  pathName: any;
}

export default function PayBtn({ authorization, uuid, pathName }: PayBtnProps) {
  const router = useRouter();

  const [impUid, setImpUid] = useState<string | null>(null);
  const [merchantUid, setMerchantUid] = useState<string | null>(null);
  const [impSuccess, setImpSuccess] = useState<boolean | null>(null);
  const [auctionUuid, setAuctionUuid] = useState<string | null>(null);

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
      m_redirect_url: `https://fe-meetplus.vercel.app/payment/${pathName}`,
    };
    IMP.request_pay(data);
  };

  /*결제 api - 백엔드 통신*/
  const handlePaymentSend = async (auctionUuid: any, impUid: any) => {
    console.log(authorization, uuid, impUid, auctionUuid);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/payment-service/api/v1/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
          impUid: impUid,
        },
        body: JSON.stringify({
          auctionUuid: auctionUuid,
        }),
      }
    );
    if (response.ok) {
      // const data = await response.json();
      console.log("결제 성공", response.status);
      router.push("/");
    } else {
      // router.push("/");

      console.error("결제 실패", response.statusText);
    }
  };

  /*쿼리스트링 일시 추가 */
  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const impUid = urlParams.get("imp_uid");
      const merchantUid = urlParams.get("merchant_uid");
      const impSuccess = urlParams.get("imp_success") === "true";
      const pathSegments = pathName.split("/");
      const auctionUuid = pathSegments[pathSegments.length - 1];

      setAuctionUuid(auctionUuid);
      setImpUid(impUid);
      setMerchantUid(merchantUid);
      setImpSuccess(impSuccess);

      console.log("auctionUuid:", auctionUuid);
      console.log("imp_uid:", impUid);
      console.log("merchant_uid:", merchantUid);
      console.log("imp_success:", impSuccess);

      // 여기 post
      if (impSuccess) {
        handlePaymentSend(auctionUuid, impUid);
      }
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
