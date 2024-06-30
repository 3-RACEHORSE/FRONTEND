"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { postSendPaymentData } from "@/apis/postSendPaymentData";

const usePayment = (
  authorization: any,
  uuid: any,
  pathName: string,
  price: any
) => {
  const router = useRouter();
  const [btnValid, setBtnValid] = useState(false);

  useEffect(() => {
    const initializePaymentScripts = () => {
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
    };

    initializePaymentScripts();
  }, []);

  const onClickPayment = () => {
    const { IMP } = window as any;
    IMP.init(`${process.env.NEXT_PUBLIC_REACT_APP_IMP}`);

    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "결제 테스트",
      amount: `${price}`,
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

  const handlePaymentSend = async (auctionUuid: any, impUid: any) => {
    console.log(authorization, uuid, impUid, auctionUuid);
    try {
      const success = await postSendPaymentData(
        authorization,
        uuid,
        impUid,
        auctionUuid
      );
      if (success) {
        router.push("https://fe-meetplus.vercel.app/");
        setBtnValid(true);
      } else {
        alert("결제 실패");
      }
    } catch (error) {
      console.error("결제 처리 중 오류", error);
      alert("결제 처리 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const impUid = urlParams.get("imp_uid");
      const impSuccess = urlParams.get("imp_success") === "true";
      const pathSegments = pathName.split("/");
      const auctionUuid = pathSegments[pathSegments.length - 1];

      if (impSuccess) {
        handlePaymentSend(auctionUuid, impUid);
      }
    }
  }, []);

  return { onClickPayment, btnValid };
};

export default usePayment;
