export async function getUserPaymentInfo(
  pathName: any,
  authorization: any,
  uuid: any
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/auction/result/${pathName}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );

  const data = await res.json();
  return data;
}
