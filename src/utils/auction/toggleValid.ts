interface toggleValidProps {
  authorization: any;
  uuid: any;
  auctionUuid?: any;
  isBookmarked?: boolean;
}

export async function toggleValid({
  authorization,
  uuid,
  auctionUuid,
  isBookmarked,
}: toggleValidProps) {
  //북마크 여부에 따른 method 변경
  let METHOD;
  if (isBookmarked) {
    METHOD = "PATCH";
  } else {
    METHOD = "POST";
  }
  console.log(METHOD);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/member-service/api/v1/authorization/subscription/auction`,
      {
        method: `${METHOD}`,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
        body: JSON.stringify({
          auctionUuid: auctionUuid,
        }),
      }
    );

    if (res.ok && METHOD === "POST") {
      return "등록";
    }
    if (res.ok && METHOD === "PATCH") {
      return "취소";
    }
  } catch (error) {
    console.error("Error:", error);
    //400 에러 => 자신 경매는 북마크 안되는 분기 처리 이름을, 본인
    return "본인";
  }
}
