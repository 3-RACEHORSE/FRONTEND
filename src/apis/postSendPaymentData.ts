export async function postSendPaymentData(
  authorization: string,
  uuid: string,
  impUid: string,
  auctionUuid: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/payment-service/api/v1/payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorization}`,
          uuid: uuid,
          impUid: impUid,
        },
        body: JSON.stringify({
          auctionUuid: auctionUuid,
        }),
      }
    );
    if (response.ok) {
      console.log("결제 성공", response.status);
      return true;
    } else {
      console.error("결제 실패", response.status);
      return false;
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생", error);
    throw new Error("결제 처리 중 오류가 발생했습니다.");
  }
}
