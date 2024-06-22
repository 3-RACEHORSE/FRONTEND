export async function getDetailListData(
  pathName: any,
  authorization: any,
  uuid: any
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/auctionpost-service/api/v1/auction-post/${pathName}`,
    {
      headers: {
        authorization: `Bearer ${authorization}`,
        uuid: `${uuid}`,
      },
    }
  );

  const data = await res.json();
  console.log(data);
  return data;
}
