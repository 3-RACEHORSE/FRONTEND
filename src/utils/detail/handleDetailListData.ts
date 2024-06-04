export async function getDetailListData(
  pathName: any,
  authorization: string | undefined,
  uuid: string | undefined
) {
  console.log("상세페이지의 기본값", pathName, authorization, uuid);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/${pathName}`,
    {
      // headers: {
      //   authorization: `Bearer ${authorization}`,
      //   uuid: `${uuid}`,
      // },
    }
  );
  if (!res.ok) {
    throw new Error("Network Error");
  }
  const data = await res.json();

  return data;
}
