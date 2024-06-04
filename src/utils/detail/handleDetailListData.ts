export async function getDetailListData(
  session: any,
  pathName: any,
  authorization: any,
  uuid: any
) {
  //분기 처리 1 =>  로그인, 2=> 로그인x
  if (session) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/${pathName}`,
      {
        headers: {
          authorization: `Bearer ${authorization}`,
          uuid: `${uuid}`,
        },
      }
    );

    const data = await res.json();
    return data;
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auction-service/api/v1/non-authorization/auction/${pathName}`
  );

  const data = await res.json();
  return data;
}
