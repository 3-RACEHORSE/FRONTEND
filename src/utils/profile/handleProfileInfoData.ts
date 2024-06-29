export async function getProfileInfoData(
  pathName: any,
  authorization: any,
  uuid: any
) {
  // 로그인 된 상태
  console.log("dddddddddddd", pathName, authorization);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/influencer?influencerUuid=${pathName}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authorization}`,
        // uuid: `${uuid}`,
      },
    }
  );
  console.log(res.status, "입니다");
  const data = await res.json();
  console.log(data);
  return data;
}
